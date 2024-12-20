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
      title: noteTile.title,
      content: noteTile.content,
    } : null;
  }
});

export const updateNoteContent = mutation({
  args: {
    tileId: v.id("baseTiles"),
    title: v.string(),
    content: v.string(),
  },
  async handler(ctx, args) {
    // Get the noteTile
    const noteTile = await ctx.db
      .query("noteTiles")
      .filter(q => q.eq(q.field("tileId"), args.tileId))
      .unique();
    
    if (!noteTile) {
      throw new Error("Note tile not found");
    }

    // Update the noteTile
    await ctx.db.patch(noteTile._id, {
      title: args.title,
      content: args.content,
    });

    // Update the baseTile's updatedAt
    await ctx.db.patch(args.tileId, {
      updatedAt: Date.now(),
    });
  }
});
