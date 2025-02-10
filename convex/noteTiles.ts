import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getNoteContent = query({
  args: { tileId: v.id("baseTiles") },
  async handler(ctx, args) {
    const noteTile = await ctx.db
      .query("noteTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    return noteTile ? {
      content: noteTile.content,
    } : null;
  }
});

export const updateNoteContent = mutation({
  args: {
    tileId: v.id("baseTiles"),
    content: v.string(),
  },
  async handler(ctx, args) {
    const noteTile = await ctx.db
      .query("noteTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    if (!noteTile) throw new Error("Note tile not found");

    await ctx.db.patch(noteTile._id, {
      content: args.content,
    });

    await ctx.db.patch(args.tileId, {
      updatedAt: Date.now(),
    });
  }
});
