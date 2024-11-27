// convex/walls.ts
import { mutation } from "./_generated/server"
import { v } from "convex/values"
import { handleUserId } from "./auth";

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      throw new Error("User ID is null");
    }

    const wall = await ctx.db.insert("walls", {
      userId,
      title: args.title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false
    })

    return wall
  }
})

// export const create = mutation({
//   args: { title: v.string() },
//   handler: async (ctx, args) => {
//     try {
//       const userId = await handleUserId(ctx);
//       if (!userId) {
//         throw new Error("User ID is null");
//       }

//       const wall = await ctx.db.insert("walls", {
//         userId,
//         title: args.title,
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         isArchived: false
//       });

//       return wall;
//     } catch (error) {
//       console.error("Error creating wall:", error);
//       throw error; // Re-throw the error if you want it to propagate further
//     }
//   }
// });