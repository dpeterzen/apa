import { Id } from "@/convex/_generated/dataModel";
import { TileSize, SIZES } from "@/types";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface UseTileActionsProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: TileSize;
}

export function useTileActions({ tileId, wallId, size }: UseTileActionsProps) {
  const updateTileSize = useMutation(api.tiles.updateTileSize);
  const swapTilePositions = useMutation(api.tiles.swapTilePositions);
  const currentTiles = useQuery(api.tiles.getWallTiles, { wallId });
  
  const handleSizeChange = async (direction: "increase" | "decrease") => {
    const currentIndex = SIZES.indexOf(size as TileSize);
    let newIndex;

    if (direction === "increase") {
      newIndex = currentIndex < SIZES.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    if (newIndex !== currentIndex) {
      await updateTileSize({
        tileId,
        size: SIZES[newIndex],
      });
    }
  };

  const handlePositionChange = async (direction: "increase" | "decrease") => {
    const allTiles = currentTiles ?? [];
    const currentTile = allTiles.find(t => t._id === tileId);
    if (!currentTile) return;
  
    const currentPosition = currentTile.position ?? 0;
    const maxPosition = allTiles.length - 1;
    
    const targetTile = allTiles.find(t => 
      direction === "increase" 
        ? t.position === currentPosition + 1
        : t.position === currentPosition - 1
    );
  
    if (
      !targetTile ||
      (direction === "increase" && currentPosition >= maxPosition) ||
      (direction === "decrease" && currentPosition <= 0)
    ) {
      return;
    }
  
    await swapTilePositions({
      tileId1: tileId,
      tileId2: targetTile._id
    });
  };

  return {
    handleSizeChange,
    handlePositionChange
  };
}