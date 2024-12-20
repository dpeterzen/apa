import React from "react";
import ContentTile from "@/components/tiles/content-tile";
import { Id } from "@/convex/_generated/dataModel";
import { TileSize, TileType } from "@/types";
import BlankTile from "@/components/tiles/blank-tile";
import { AnimatePresence } from "motion/react";

interface BaseTile {
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
}

interface WallGridProps {
  tiles: BaseTile[] | undefined;
  wallId: Id<"walls">;
  showBlankTile: boolean;
  onTileSelect: (type: TileType) => void;
  setShowBlankTile: (show: boolean) => void;
  onExitComplete: () => void;
}

export function WallGrid({ 
  tiles, 
  wallId, 
  showBlankTile, 
  onTileSelect, 
  setShowBlankTile,
  onExitComplete
}: WallGridProps) {
  return (
    <div className="grid grid-cols-12 auto-rows-[100px] gap-3">
      <AnimatePresence mode="popLayout" onExitComplete={onExitComplete}>
        {tiles?.map((baseTile) => (
          <ContentTile
            key={baseTile._id}
            tile={{
              id: baseTile._id,
              type: baseTile.type as TileType,
              size: baseTile.size as TileSize,
              wallId: wallId,
              title: "",
              position: baseTile.position,
            }}
          />
        ))}
        {showBlankTile && (
          <BlankTile
            onSelect={onTileSelect}
            setShowBlankTile={setShowBlankTile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}