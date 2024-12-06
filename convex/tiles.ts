import { mutation, query } from "./_generated/server"

import { Id } from "./_generated/dataModel";
import { v } from "convex/values"

export type TileType = "note" | "video" | "image";
export type TileSize = "small" | "medium" | "large";

export const create = mutation({
  args: {
    wallId: v.id("walls"),
    type: v.string(),
    size: v.string(),
    position: v.object({
      x: v.number(),
      y: v.number()
    }),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  async handler(ctx, args) {
    // Auth check
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }
    // Debug log
    console.log("Auth identity:", identity);
    // Get user document via subject id
    const user = await ctx.db
    .query("users")
    .filter(q => q.eq(q.field("_id"), identity.subject))
    .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Wall validation with proper user ID
    const wall = await ctx.db.get(args.wallId);
    if (!wall) {
      throw new Error("Wall not found");
    }

    if (wall.userId !== user._id) {
      throw new Error("Not authorized to add tiles to this wall");
    }

    // Check tile limit if set
    if (wall.maxTiles && (wall.tileCount ?? 0) >= wall.maxTiles) {
      throw new Error("Wall tile limit reached");
    }

    // Create base tile with correct user ID
    const baseTile = await ctx.db.insert("baseTiles", {
      userId: user._id,
      wallId: args.wallId,
      type: args.type as TileType,
      position: args.position,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false
    });

    // Increment wall tile count
    await ctx.db.patch(args.wallId, {
      tileCount: (wall.tileCount ?? 0) + 1 // tileCount currently optional, can make required
    });

    // Handle specific tile types
    switch (args.type) {
      case "note":

        // Create note tile
        const noteTile = await ctx.db.insert("noteTiles", {
          tileId: baseTile,
          title: args.title || "",
          content: args.content || "",
        });

        return {
          ...baseTile as object,
          tileData: noteTile
        };

      default:
        throw new Error(`Unsupported tile type: ${args.type}`);
    }
  }
});


export const getWallTiles = query({
  args: { wallId: v.string() },
  async handler(ctx, args) {
    const baseTiles = await ctx.db
      .query("baseTiles")
      .filter((q) => q.eq(q.field("wallId"), args.wallId))
      .collect();
    
    return baseTiles;
  }
});