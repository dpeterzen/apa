import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateVideoUrl = mutation({
  args: {
    tileId: v.id("baseTiles"),
    url: v.string(),
    videoId: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const tile = await ctx.db.get(args.tileId);
    if (!tile) throw new Error("Tile not found");

    // Extract video ID from YouTube URL
    let videoId = args.videoId;
    if (
      (!videoId && args.url.includes("youtube.com")) ||
      args.url.includes("youtu.be")
    ) {
      const url = new URL(args.url);
      if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      } else {
        videoId = url.searchParams.get("v") || "";
      }
    }

    const videoTile = await ctx.db
      .query("videoTiles")
      .filter((q) => q.eq(q.field("tileId"), args.tileId))
      .first();

    if (videoTile) {
      await ctx.db.patch(videoTile._id, {
        url: args.url,
        type: args.type || "youtube",
        videoId: videoId || "",
      });
    } else {
      await ctx.db.insert("videoTiles", {
        tileId: args.tileId,
        url: args.url,
        type: args.type || "youtube",
        videoId: videoId || "",
      });
    }

    await ctx.db.patch(args.tileId, {
      updatedAt: Date.now(),
    });

    return videoId;
  },
});

export const getVideoData = query({
  args: { tileId: v.id("baseTiles") },
  async handler(ctx, args) {
    const videoTile = await ctx.db
      .query("videoTiles")
      .filter((q) => q.eq(q.field("tileId"), args.tileId))
      .first();

    return videoTile;
  },
});
