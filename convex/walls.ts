import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { getUserIdentity } from "./auth";

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await getUserIdentity(ctx);
    if (!identity) {
      throw new Error("User ID is null");
    }

    const wall = await ctx.db.insert("walls", {
      userId: identity,
      title: args.title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false
    })

    return wall;
  }
});

export const getUserWalls = query({
  handler: async (ctx) => {
    const identity = await getUserIdentity(ctx);
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const walls = await ctx.db
      .query("walls")
      .filter((q) => q.eq(q.field("userId"), identity))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()
    console.log("walls: ", walls);
    return walls;
  }
})