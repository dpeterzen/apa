import React from "react";
import ContentTile from "@/components/tiles/content-tile";
import { Id } from "@/convex/_generated/dataModel";
import { TileSize, TileType } from "@/types";
import BlankTile from "@/components/tiles/blank-tile";
import { AnimatePresence } from "motion/react";
import { BaseTile } from "@/types";

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
  const activeTiles = tiles?.filter(tile => tile.position >= 0);
  
  return (
    
    <div className="grid grid-cols-12 auto-rows-[100px] gap-5 w-full max-w-[1536px]">
      <AnimatePresence mode="popLayout" onExitComplete={onExitComplete}>
        {activeTiles?.map((baseTile) => (
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