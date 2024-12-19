import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { z } from "zod";

export const updateImageUrl = mutation({
  args: {
    tileId: v.id("baseTiles"),
    imageUrl: v.string(),
  },
  async handler(ctx, args) {
    const imageUrlTile = await ctx.db
      .query("imageUrlTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    if (!imageUrlTile) {
      throw new Error("Image tile not found");
    }

    await ctx.db.patch(imageUrlTile._id, {
      imageUrl: args.imageUrl,
    });

    await ctx.db.patch(args.tileId, {
      updatedAt: Date.now(),
    });
  }
});

export const getImageUrl = query({
  args: { tileId: v.id("baseTiles") },
  async handler(ctx, args) {
    const imageUrlTile = await ctx.db
      .query("imageUrlTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    return imageUrlTile ? imageUrlTile.imageUrl : null;
  }
});

export const getAltText = query({
  args: { tileId: v.id("baseTiles") },
  async handler(ctx, args) {
    const imageUrlTile = await ctx.db
      .query("imageUrlTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    return imageUrlTile?.altText || null;
  }
});

const imageAltTextSchema = z.object({
  altText: z.union([
    z.string().length(0),  // Allow empty string
    z.string()
      .max(125, "Alt text cannot exceed 125 characters")
      .refine(
        (text) => !text.includes("<script>"),
        "Invalid characters in alt text"
      )
  ])
});

export const updateImageTileAltText = mutation({
  args: {
    tileId: v.id("baseTiles"),
    altText: v.string(),
  },
  async handler(ctx, args) {
    // Validate input
    const validatedData = imageAltTextSchema.parse({
      altText: args.altText
    });

    // Find the image tile
    const imageUrlTile = await ctx.db
      .query("imageUrlTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    if (!imageUrlTile) {
      throw new Error("Image tile not found");
    }

    // Update with validated data
    await ctx.db.patch(imageUrlTile._id, {
      altText: validatedData.altText,
    });
  }
});
