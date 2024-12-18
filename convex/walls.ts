import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { isValidConvexId } from "./utils";

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User ID is null");
    }

    const wall = await ctx.db.insert("walls", {
      userId: identity.subject as Id<"users">,
      title: args.title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false,
      tileCount: 0,
    })

    return wall;
  }
});

export const list = query({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const userId = identity.subject;

    const walls = await ctx.db
      .query("walls")
      .filter(q => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect()
      .then(walls => walls.sort((a, b) => b.updatedAt - a.updatedAt));

    return walls;
  },
});

export const getUserWalls = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const walls = await ctx.db
      .query("walls")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()
    return walls;
  }
})

export const getFirstWall = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // This is where returning null is appropriate - when no wall exists
    const wall = await ctx.db
      .query("walls")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .first();

    // This is a valid "no data" case
    return wall; // might be null if no walls exist
  }
});

export const getWall = query({
  args: { id: v.string() },
  async handler(ctx, args) {
    return await ctx.db.get(args.id as Id<"walls">);
  }
});

export const getUserWall = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Get the authenticated user's ID
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get the wall document
    const wall = await ctx.db.get(args.id as Id<"walls">);
    if (!wall) {
      // Return null instead of throwing when wall not found
      return null;
    }

    // Check ownership
    const isOwner = wall.userId === identity.subject;

    // Return wall data with ownership flag
    return {
      ...wall,
      isOwner,
    };
  },
});

export const checkWallAccess = query({
  args: { wallId: v.string() },
  handler: async (ctx, args) => {
    if (!isValidConvexId(args.wallId)) {
      return false;
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    try {
      // Use ctx.db.normalizeId instead of Id.from
      const wallId = ctx.db.normalizeId("walls", args.wallId);
      if (!wallId) {
        return false;
      }
      const wall = await ctx.db.get(wallId);
      if (!wall) return false;
      return wall.userId === identity.subject;
    } catch {
      return false;
    }
  },
});


// export const archiveWall = mutation({
//   args: { id: v.string() },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const wall = await ctx.db.get(args.id as Id<"walls">);
//     if (!wall) {
//       throw new Error("Wall not found");
//     }

//     if (wall.userId !== identity.subject) {
//       throw new Error("Not authorized");
//     }

//     await ctx.db.update("walls", wall.id, {
//       isArchived: true,
//       updatedAt: Date.now(),
//     });
//   },
// });