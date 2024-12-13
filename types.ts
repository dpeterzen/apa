import { Id } from "@/convex/_generated/dataModel";

export type TileSize = "small" | "medium" | "large";
export type TileType = "note" | "video" | "image";

export const SIZES = ["small", "medium", "large"] as const;

export interface Tile {
  id: string;
  type: TileType;
  size: TileSize;
  content: string;
  wallId: Id<"walls">;
}