import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateCanvasContent = mutation({
  args: {
    tileId: v.id("baseTiles"),
    content: v.string(),
  },
  async handler(ctx, args) {
    console.log("Updating canvas content:", args); // Debug log
    const canvasTile = await ctx.db
      .query("canvasTiles")
      .filter((q) => q.eq(q.field("tileId"), args.tileId))
      .first();

    if (canvasTile) {
      console.log("Canvas tile found, updating..."); // Debug log
      await ctx.db.patch(canvasTile._id, {
        content: args.content,
      });
    } else {
      console.log("Canvas tile not found, inserting..."); // Debug log
      await ctx.db.insert("canvasTiles", {
        tileId: args.tileId,
        content: args.content,
      });
    }

    await ctx.db.patch(args.tileId, {
      updatedAt: Date.now(),
    });
  },
});

export const getCanvasContent = query({
  args: { tileId: v.id("baseTiles") },
  async handler(ctx, args) {
    const canvasTile = await ctx.db
      .query("canvasTiles")
      .filter((q) => q.eq(q.field("tileId"), args.tileId))
      .first();

    return canvasTile;
  },
});
