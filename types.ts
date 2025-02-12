import { Id } from "./convex/_generated/dataModel";

export const TILE_TYPES = ['note', 'image', 'video', 'canvas'] as const
export const TILE_SIZES = ['small', 'medium', 'large'] as const

export type TileType = typeof TILE_TYPES[number]
export type TileSize = typeof TILE_SIZES[number]

export interface Tile {
  id: string;
  type: TileType;
  size: TileSize;
  content?: string;
  wallId: Id<"walls">;
  position: number;
}

export interface BaseTile {
  _id: Id<"baseTiles">;
  type: string;
  size: string;
  position: number;
  wallId: Id<"walls">;
  userId: Id<"users">;
  createdAt: number;
  updatedAt: number;
  isArchived: boolean;
  _creationTime: number;
  name?: string;
  caption?: string;
}