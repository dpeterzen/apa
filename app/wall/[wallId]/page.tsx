"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import React from "react";
import { AddTilePlus } from "@/components/icons/add-tile-plus";
import { AddTileSquarePlus } from "@/components/icons/add-tile-square-plus";
import ContentTile from "@/components/tiles/content-tile";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel"
type TileSize = "small" | "medium" | "large";
type TileType = "note" | "video" | "image";

interface Tile {
  id: string;
  type: TileType;
  size: TileSize;
  content: string;
}

export function toWallId(id: string): Id<"walls"> {
  return id as unknown as Id<"walls">;
}

export default function WallIdPage({
  params,
}: {
  params: Promise<{ wallId: string }>;
}) {
  const resolvedParams = React.use(params);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const createTile = useMutation(api.tiles.create)


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
  const tiles = useQuery(api.tiles.getWallTiles, { wallId: resolvedParams.wallId });
  // console.log("resolvedParams", resolvedParams.wallId);
  console.log(tiles);
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

  const handleCreateTile = async (wallId: Id<"walls">) => {
    await createTile({
      wallId,
      type: "note",
      size: "medium", // Default size
      position: { x: 0, y: 0 }, // Default position
      title: "", // Default title
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-2 p-2 pb-[84px]">
      <div className="grid grid-cols-12 auto-rows-[100px] gap-3">
      {tiles?.map((baseTile) => (
        <ContentTile
          key={baseTile._id}
          tile={{
            id: baseTile._id,
            type: baseTile.type as TileType,
            size: baseTile.size as TileSize,
            wallId: resolvedParams.wallId as Id<"walls">, 
            content: baseTile.type === "note" ? "" : `
              Wall ID: ${baseTile.wallId}
              User ID: ${baseTile.userId}
              Created: ${new Date(baseTile.createdAt).toLocaleDateString()}
            `
          }}
        />
      ))}
      </div>
      <Button
        className="pl-[6px] group justify-start items-center hover:bg-transparent rounded-none [&_svg]:size-[20px]"
        variant="ghost"
        onClick={() => handleCreateTile(toWallId(resolvedParams.wallId))}
      >
        <span className="flex items-center">
          <span className="relative flex items-center justify-center mb-[3px] mr-[3px]">
            <AddTilePlus className="group-hover:hidden" />
            <AddTileSquarePlus className="hidden group-hover:block" />
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-blue-600 ml-2">Add tile</span>
        </span>
      </Button>
    </main>
  );
}
