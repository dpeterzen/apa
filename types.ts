import { Id } from "@/convex/_generated/dataModel";

export type TileSize = "small" | "medium" | "large";
export type TileType = "note" | "video" | "image";

// Optional: Keep these as constants for validation
export const VALID_SIZES = ["small", "medium", "large"] as const;
export const VALID_TYPES = ["note", "video", "image"] as const;

export const SIZES = ["small", "medium", "large"] as const;


// Database schema type
export interface BaseTile {
  _id: Id<"baseTiles">;
  _creationTime: number;
  type: string;
  size: string;
  position: number;
  userId: Id<"users">;
  wallId: Id<"walls">;
  createdAt: number;
  updatedAt: number;
  isArchived: boolean;
}

// Client-side type with strict typing
export interface ClientTile {
  id: string;
  type: TileType;
  size: TileSize;
  title: string;
  content?: string;
  wallId: Id<"walls">;
  position: number;
}

export const toClientTile = (baseTile: BaseTile): ClientTile => ({
  id: baseTile._id,
  type: baseTile.type as TileType,
  size: baseTile.size as TileSize,
  title: "",
  wallId: baseTile.wallId,
  position: baseTile.position
});

