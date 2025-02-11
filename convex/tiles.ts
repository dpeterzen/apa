import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { TileSize, TileType } from "../types";
import { z } from "zod";

export const create = mutation({
  args: {
    wallId: v.id("walls"),
    type: v.union(v.literal("note"), v.literal("video"), v.literal("image")),
    size: v.union(v.literal("small"), v.literal("medium"), v.literal("large")),
    position: v.number(),
    content: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  async handler(ctx, args) {
    // Auth check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Debug log
    // console.log("Auth identity:", identity);
    // Get user document via subject id
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), identity.subject))
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
    // Get current max position
    const tiles = await ctx.db
      .query("baseTiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("wallId"), args.wallId),
          q.gte(q.field("position"), 0)
        )
      )
      .collect();

    // Calculate next position (max + 1 or 0 if no tiles)
    const nextPosition =
      tiles.length === 0 ? 0 : Math.max(...tiles.map((t) => t.position)) + 1;

    // Create base tile with correct user ID
    const baseTile = await ctx.db.insert("baseTiles", {
      userId: user._id,
      wallId: args.wallId,
      type: args.type as TileType,
      size: args.size as TileSize,
      position: nextPosition,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false,
    });

    // Increment wall tile count
    await ctx.db.patch(args.wallId, {
      tileCount: (wall.tileCount ?? 0) + 1, // tileCount currently optional, can make required
    });

    // Handle specific tile types
    switch (args.type) {
      case "note":
        // Create note tile
        const noteTile = await ctx.db.insert("noteTiles", {
          tileId: baseTile,
          content: args.content || "",
        });

        return {
          ...(baseTile as object),
          tileData: noteTile,
        };

      case "image":
        // Create image tile
        const imageUrlTile = await ctx.db.insert("imageUrlTiles", {
          tileId: baseTile,
          imageUrl: args.imageUrl || "",
        });

        return {
          ...(baseTile as object),
          tileData: imageUrlTile,
        };

      case "video":
        // Create video tile
        const videoTile = await ctx.db.insert("videoTiles", {
          tileId: baseTile,
          url: args.videoUrl || "",
          type: "youtube", // default type
        });

        return {
          ...(baseTile as object),
          tileData: videoTile,
        };

      default:
        throw new Error(`Unsupported tile type: ${args.type}`);
    }
  },
});

export const deleteTile = mutation({
  args: {
    tileId: v.id("baseTiles"),
    wallId: v.id("walls"),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const baseTile = await ctx.db.get(args.tileId);
    if (!baseTile) throw new Error("Tile not found");
    if (baseTile.userId !== identity.subject) throw new Error("Unauthorized");

    // Delete associated type-specific content based on tile type
    if (baseTile.type === "note") {
      const noteTile = await ctx.db
        .query("noteTiles")
        .filter((q) => q.eq(q.field("tileId"), args.tileId))
        .unique();
      if (noteTile) {
        await ctx.db.delete(noteTile._id);
      }
    } else if (baseTile.type === "image") {
      const imageUrlTile = await ctx.db
        .query("imageUrlTiles")
        .filter((q) => q.eq(q.field("tileId"), args.tileId))
        .unique();
      if (imageUrlTile) {
        await ctx.db.delete(imageUrlTile._id);
      }
    } else if (baseTile.type === "video") {
      const videoTile = await ctx.db
        .query("videoTiles")
        .filter((q) => q.eq(q.field("tileId"), args.tileId))
        .unique();
      if (videoTile) {
        await ctx.db.delete(videoTile._id);
      }
    }

    // Delete the baseTile
    await ctx.db.delete(args.tileId);

    // After deleting the tile, get remaining tiles and reorder
    const remainingTiles = await ctx.db
      .query("baseTiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("wallId"), args.wallId),
          q.gte(q.field("position"), 0) // Only get tiles with position >= 0
        )
      )
      .collect();

    // Sort tiles by current position
    const sortedTiles = remainingTiles.sort((a, b) => a.position - b.position);

    // Update positions to be sequential starting from 0
    const updates = sortedTiles.map((tile, index) =>
      ctx.db.patch(tile._id, { position: index })
    );

    await Promise.all(updates);

    // Update wall tile count
    const wall = await ctx.db.get(args.wallId);
    if (wall) {
      await ctx.db.patch(args.wallId, {
        tileCount: (wall.tileCount ?? 1) - 1,
      });
    }
  },
});

export const updateTileSize = mutation({
  args: {
    tileId: v.id("baseTiles"),
    size: v.union(v.literal("small"), v.literal("medium"), v.literal("large")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.tileId, { size: args.size });
  },
});

export const resequenceWallTiles = mutation({
  args: {
    wallId: v.id("walls"),
  },
  async handler(ctx, args) {
    const wallTiles = await ctx.db
      .query("baseTiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("wallId"), args.wallId),
          q.gte(q.field("position"), 0)
        )
      )
      .collect();

    const sortedTiles = wallTiles.sort((a, b) => a.position - b.position);

    const updates = sortedTiles.map((tile, index) =>
      ctx.db.patch(tile._id, { position: index })
    );

    await Promise.all(updates);
  },
});

export const resequenceArchivedTiles = mutation({
  args: {
    wallId: v.id("walls"),
  },
  async handler(ctx, args) {
    const archivedTiles = await ctx.db
      .query("baseTiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("wallId"), args.wallId),
          q.lt(q.field("position"), 0)
        )
      )
      .collect();

    const sortedTiles = archivedTiles.sort((a, b) => b.position - a.position);

    const updates = sortedTiles.map((tile, index) =>
      ctx.db.patch(tile._id, { position: -(index + 1) })
    );

    await Promise.all(updates);
  },
});

export const updateTilePosition = mutation({
  args: {
    tileId: v.id("baseTiles"),
    position: v.number(),
  },
  async handler(ctx, args) {
    const tile = await ctx.db.get(args.tileId);
    if (!tile) throw new Error("Tile not found");

    // Get the wall
    const wall = await ctx.db.get(tile.wallId);
    if (!wall) throw new Error("Wall not found");

    const isMovingToWall = args.position >= 0 && tile.position < 0;
    // When restoring a tile (moving from negative to positive position)
    if (isMovingToWall) {
      // Get current max position
      const tiles = await ctx.db
        .query("baseTiles")
        .filter((q) =>
          q.and(
            q.eq(q.field("wallId"), tile.wallId),
            q.gte(q.field("position"), 0)
          )
        )
        .collect();

      // Set position to max + 1 or 0 if no tiles
      const newPosition =
        tiles.length === 0 ? 0 : Math.max(...tiles.map((t) => t.position)) + 1;

      await ctx.db.patch(args.tileId, {
        position: newPosition,
        updatedAt: Date.now(),
      });
    } else {
      // Normal position update
      await ctx.db.patch(args.tileId, {
        position: args.position,
        updatedAt: Date.now(),
      });
    }
  },
});

export const getMinPosition = query({
  args: { wallId: v.id("walls") },
  async handler(ctx, args) {
    const tiles = await ctx.db
      .query("baseTiles")
      .filter((q) => q.eq(q.field("wallId"), args.wallId))
      .collect();

    if (tiles.length === 0) return 0;

    return Math.min(...tiles.map((tile) => tile.position));
  },
});

export const getMaxPosition = query({
  args: { wallId: v.id("walls") },
  async handler(ctx, args) {
    const tiles = await ctx.db
      .query("baseTiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("wallId"), args.wallId),
          q.gte(q.field("position"), 0)
        )
      )
      .collect();

    if (tiles.length === 0) return -1;
    return Math.max(...tiles.map((tile) => tile.position));
  },
});

export const getLowestNegativePosition = query({
  args: { wallId: v.id("walls") },
  async handler(ctx, args) {
    const tiles = await ctx.db
      .query("baseTiles")
      .filter((q) =>
        q.and(
          q.eq(q.field("wallId"), args.wallId),
          q.lt(q.field("position"), 0)
        )
      )
      .collect();

    if (tiles.length === 0) return -1;
    return Math.min(...tiles.map((tile) => tile.position));
  },
});

export const swapTilePositions = mutation({
  args: {
    tileId1: v.id("baseTiles"),
    tileId2: v.id("baseTiles"),
  },
  async handler(ctx, args) {
    const tile1 = await ctx.db.get(args.tileId1);
    const tile2 = await ctx.db.get(args.tileId2);

    if (!tile1 || !tile2) throw new Error("Tiles not found");

    // Swap positions
    await ctx.db.patch(args.tileId1, {
      position: tile2.position,
      updatedAt: Date.now(),
    });

    await ctx.db.patch(args.tileId2, {
      position: tile1.position,
      updatedAt: Date.now(),
    });
  },
});

export const getWallTiles = query({
  args: { wallId: v.string() },
  async handler(ctx, args) {
    const baseTiles = await ctx.db
      .query("baseTiles")
      .filter((q) => q.eq(q.field("wallId"), args.wallId))
      .collect();

    // Sort in memory since Convex doesn't support complex sorting
    return baseTiles.sort((a, b) => {
      if (a.position === b.position) {
        return a._creationTime - b._creationTime;
      }
      return a.position - b.position;
    });
  },
});

// Tile name schema constants
const tileNameSchema = z.object({
  name: z.union([
    z.string().length(0),  // Allow empty string
    z.string()
      .max(125, "Name cannot exceed 125 characters")
      .refine(
        (text: string) => !text.includes("<script>"),
        "Invalid characters in name"
      )
  ])
});

export const updateTileName = mutation({
  args: {
    tileId: v.id("baseTiles"),
    name: v.string(),
  },
  async handler(ctx, args) {
    // Validate input
    const validatedData = tileNameSchema.parse({
      name: args.name
    });

    await ctx.db.patch(args.tileId, {
      name: validatedData.name,
      updatedAt: Date.now(),
    });
  },
});

export const getTileName = query({
  args: { tileId: v.id("baseTiles") },
  async handler(ctx, args) {
    const tile = await ctx.db.get(args.tileId);
    return tile?.name || null;
  },
});
