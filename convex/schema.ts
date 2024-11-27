import { defineSchema, defineTable } from "convex/server";
import { Validator, v } from "convex/values";

// The users, accounts, sessions and verificationTokens tables are modeled
// from https://authjs.dev/getting-started/adapters#models

export const userSchema = {
  email: v.string(),
  name: v.optional(v.string()),
  emailVerified: v.optional(v.number()),
  image: v.optional(v.string()),
};

export const sessionSchema = {
  userId: v.id("users"),
  expires: v.number(),
  sessionToken: v.string(),
};

export const accountSchema = {
  userId: v.id("users"),
  type: v.union(
    v.literal("email"),
    v.literal("oidc"),
    v.literal("oauth"),
    v.literal("webauthn"),
  ),
  provider: v.string(),
  providerAccountId: v.string(),
  refresh_token: v.optional(v.string()),
  access_token: v.optional(v.string()),
  expires_at: v.optional(v.number()),
  token_type: v.optional(v.string() as Validator<Lowercase<string>>),
  scope: v.optional(v.string()),
  id_token: v.optional(v.string()),
  session_state: v.optional(v.string()),
};

export const verificationTokenSchema = {
  identifier: v.string(),
  token: v.string(),
  expires: v.number(),
};

export const authenticatorSchema = {
  credentialID: v.string(),
  userId: v.id("users"),
  providerAccountId: v.string(),
  credentialPublicKey: v.string(),
  counter: v.number(),
  credentialDeviceType: v.string(),
  credentialBackedUp: v.boolean(),
  transports: v.optional(v.string()),
};

const authTables = {
  users: defineTable(userSchema).index("email", ["email"]),
  sessions: defineTable(sessionSchema)
    .index("sessionToken", ["sessionToken"])
    .index("userId", ["userId"]),
  accounts: defineTable(accountSchema)
    .index("providerAndAccountId", ["provider", "providerAccountId"])
    .index("userId", ["userId"]),
  verificationTokens: defineTable(verificationTokenSchema).index(
    "identifierToken",
    ["identifier", "token"],
  ),
  authenticators: defineTable(authenticatorSchema)
    .index("userId", ["userId"])
    .index("credentialID", ["credentialID"]),
};

export default defineSchema({
  ...authTables,
  
  // Walls
  walls: defineTable({
    userId: v.id("users"),
    title: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isArchived: v.boolean(),
    isPublic: v.optional(v.boolean()) // For future sharing capabilities
  })
  .index("byUser", ["userId"])
  .index("byUserAndUpdated", ["userId", "updatedAt"])
  .index("byPublic", ["isPublic"]), // For discovering public walls

  // Base tile table
  baseTiles: defineTable({
    wallId: v.id("walls"),
    userId: v.id("users"),
    type: v.string(), // "note", "image", "youtube", etc.
    position: v.object({
      x: v.number(),
      y: v.number()
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
    isArchived: v.boolean()
  })
    .index("byWall", ["wallId"])
    .index("byType", ["type"]),

  // Type-specific content tables
  noteTiles: defineTable({
    tileId: v.id("baseTiles"),
    title: v.string(),
    content: v.string()
  })
    .index("byTileId", ["tileId"]),


  imageTiles: defineTable({
    tileId: v.id("baseTiles"),
    url: v.string(),
    caption: v.optional(v.string()),
    altText: v.string()
  })
    .index("byTileId", ["tileId"]),

  // For uploaded images
  uploadedImageTiles: defineTable({
    tileId: v.id("baseTiles"),
    storageId: v.string(), // Reference to storage system (e.g. S3, Cloudinary)
    fileName: v.string(),
    mimeType: v.string(),
    size: v.number(),
    caption: v.optional(v.string()),
    altText: v.string(),
    thumbnailUrl: v.optional(v.string()) // For optimized preview
  })
    .index("byTileId", ["tileId"])
    .index("byStorageId", ["storageId"]),

  // For YouTube videos
  youtubeTiles: defineTable({
    tileId: v.id("baseTiles"),
    videoId: v.string(),
    startTime: v.optional(v.number()),
    endTime: v.optional(v.number())
  })
    .index("byTileId", ["tileId"]),

  // For URL/link tiles
  linkTiles: defineTable({
    tileId: v.id("baseTiles"),
    url: v.string(),
    title: v.optional(v.string()), // User provided or scraped title
    description: v.optional(v.string()), // User provided or meta description
    // Preview metadata
    previewData: v.optional(v.object({
      siteName: v.optional(v.string()),
      favicon: v.optional(v.string()),
      ogImage: v.optional(v.string()), // Open Graph image URL
      ogTitle: v.optional(v.string()),
      ogDescription: v.optional(v.string())
    }))
  })
    .index("byTileId", ["tileId"])
    .index("byUrl", ["url"]),
    // Basic URL storage
    // Rich preview capabilities
    // User customization
    // SEO metadata storage
    // Efficient querying by tile ID or URL

  // For tasks
  taskTiles: defineTable({
    tileId: v.id("baseTiles"),
    isCompleted: v.boolean(),
    text: v.string(),
  }),

});