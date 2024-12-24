import React from "react";
import ContentTile from "@/components/tiles/content-tile";
import { Id } from "@/convex/_generated/dataModel";
import { BaseTile, TileType, toClientTile } from "@/types";
import BlankTile from "@/components/tiles/blank-tile";
import { AnimatePresence } from "motion/react";


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
  showBlankTile, 
  onTileSelect, 
  setShowBlankTile,
  onExitComplete
}: WallGridProps) {
  const activeTiles = tiles?.filter(tile => tile.position >= 0);
  
  return (
    <div className="grid grid-cols-12 auto-rows-[100px] gap-3">
      <AnimatePresence mode="popLayout" onExitComplete={onExitComplete}>
        {activeTiles?.map((baseTile) => (
          <ContentTile
            key={baseTile._id}
            tile={toClientTile(baseTile)}
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