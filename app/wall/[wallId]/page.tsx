"use client";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import React from "react";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { TileSize, TileType } from "@/types";
import { WallGrid } from "@/components/walls/wall-grid";
import { AddTileButton } from "@/components/buttons/add-tile-button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import * as motion from "motion/react-client";

export default function WallIdPage({
  params,
}: {
  params: Promise<{ wallId: string }>;
}) {
  const resolvedParams = React.use(params);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const createTile = useMutation(api.tiles.create);
  const [showBlankTile, setShowBlankTile] = useState(false);
  const [isExitComplete, setIsExitComplete] = useState(true);
  const [delayedExit, setDelayedExit] = useState(true);
  const wall = useQuery(api.walls.getWall, {
    id: resolvedParams.wallId,
  });

  const updateTilePosition = useMutation(api.tiles.updateTilePosition);
  const getMaxPosition = useQuery(api.tiles.getMaxPosition, {
    wallId: resolvedParams.wallId as Id<"walls">,
  });

  useEffect(() => {
    if (isExitComplete) {
      const timer = setTimeout(() => {
        setDelayedExit(true);
      }, 1);
      return () => clearTimeout(timer);
    } else {
      setDelayedExit(false);
    }
  }, [isExitComplete]);

  // Not authenticated, redirect immediately
  if (!isLoading && !isAuthenticated) {
    redirect("/");
  }

  // Query only if authenticated
  const hasAccess = useQuery(
    api.walls.checkWallAccess,
    isAuthenticated ? { wallId: resolvedParams.wallId } : "skip"
  );

  // User has access, render wall content
  const tiles = useQuery(api.tiles.getWallTiles, {
    wallId: resolvedParams.wallId,
  });
  // console.log("resolvedParams", resolvedParams.wallId);
  // console.log(tiles);
  // Show loading state
  if (isLoading || (isAuthenticated && hasAccess === undefined)) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1>One moment please...</h1>
      </main>
    );
  }

  // Invalid wall ID or no access
  if (!hasAccess) {
    redirect("/wall"); // Redirect to wall list
  }

  const handleTileSelect = async (
    type: TileType,
    options?: { title?: string }
  ) => {
    try {
      const currentPosition = wall?.tileCount ?? 0;

      const newTile = {
        type,
        size: "medium" as TileSize,
        wallId: resolvedParams.wallId as Id<"walls">,
        title: options?.title || "",
        content: "",
        position: currentPosition,
      };

      await createTile(newTile);
      setShowBlankTile(false);
    } catch (error) {
      console.error("Error creating tile:", error);
    }
  };

  const handleCreateTile = () => {
    setShowBlankTile(true);
    setIsExitComplete(false);
    setDelayedExit(false);
  };

  const handleRestoreTile = async (tileId: Id<"baseTiles">) => {
    const maxPosition = getMaxPosition ?? -1;
    await updateTilePosition({
      tileId,
      position: maxPosition + 1,
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-2 p-2 pl-[13px] pr-[14px]">
      <WallGrid
        tiles={tiles}
        wallId={resolvedParams.wallId as Id<"walls">}
        showBlankTile={showBlankTile}
        onTileSelect={handleTileSelect}
        setShowBlankTile={setShowBlankTile}
        onExitComplete={() => setIsExitComplete(true)}
      />

      {!showBlankTile && delayedExit && (
        <AddTileButton onClick={() => handleCreateTile()} />
      )}

      <div className="flex-1" />

      <motion.div
        className="mt-[45px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-sm font-medium mb-2">Stash</h3>
        <motion.div
          layout
          className="max-h-[250px] grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 overflow-y-auto"
          transition={{ duration: 0.3 }}
        >
          {tiles
            ?.filter((tile) => tile.position < 0)
            .sort((a, b) => b.position - a.position)
            .map((tile, index) => (
              <motion.div
                layout
                layoutId={`removed-tile-${tile._id}`}
                key={tile._id}
                className="flex items-center justify-between border border-zinc-200 dark:border-zinc-900/30 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                }}
              >
                <div className="h-[25px] border bg-zinc-200/30 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-900/30 rounded-xl flex-grow pl-2 whitespace-nowrap overflow-hidden">

                  <span className="text-xs align-middle">{tile.type}</span>
                </div>
                <Button
                  variant="ghost"
                  className="rounded-full h-6 w-6 p-0"
                  onClick={() => handleRestoreTile(tile._id)}
                >
                  <Plus />
                </Button>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
