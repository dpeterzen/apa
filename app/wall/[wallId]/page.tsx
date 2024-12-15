"use client";
import { useState } from "react";
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
import { Id } from "@/convex/_generated/dataModel";
import { TileSize, TileType } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar, SendHorizontal, Smile, X } from "lucide-react";

const BlankTile = ({
  onSelect,
  setShowBlankTile,
}: {
  onSelect: (type: TileType) => void;
  setShowBlankTile: (show: boolean) => void;
}) => {
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3 flex items-center justify-center">
      <Command className=" rounded-xl border">
        <div className="flex items-center px-3 w-full">
          <div className="flex-1 min-w-0">
            <CommandInput
              placeholder="Start typing or choose a tile..."
              className="w-full"
            />
          </div>
          <div className="flex gap-2 ml-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBlankTile(false)}
              className=""
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelect("note")}
              className=""
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onClick={() => onSelect("note")}>
              <Calendar />
              <span>Note</span>
            </CommandItem>
            <CommandItem onClick={() => onSelect("image")}>
              <Smile />
              <span>Image</span>
            </CommandItem>
            <CommandItem disabled>
              <Smile />
              <span>File Upload</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

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
  const createTile = useMutation(api.tiles.create);
  const [showBlankTile, setShowBlankTile] = useState(false);

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

  const handleTileSelect = (type: TileType) => {
    const newTile = {
      type,
      size: "medium" as TileSize,
      wallId: resolvedParams.wallId as Id<"walls">,
      position: {
        x: 0,
        y: 0,
      },
    };

    // Call your mutation to create tile in DB
    createTile(newTile);
    setShowBlankTile(false);
  };
  const handleCreateTile = () => {
    setShowBlankTile(true);
  };
  return (
    <main className="flex flex-1 flex-col gap-2 p-2 pl-[13px] pr-[14px] pb-[84px]">
      <div className="grid grid-cols-12 auto-rows-[100px] gap-3">
        {tiles?.map((baseTile) => (
          <ContentTile
            key={baseTile._id}
            tile={{
              id: baseTile._id,
              type: baseTile.type as TileType,
              size: baseTile.size as TileSize,
              wallId: resolvedParams.wallId as Id<"walls">,
              content:
                baseTile.type === "note"
                  ? ""
                  : `
              Wall ID: ${baseTile.wallId}
              User ID: ${baseTile.userId}
              Created: ${new Date(baseTile.createdAt).toLocaleDateString()}
            `,
            }}
          />
        ))}
        {showBlankTile && (
          <BlankTile
            onSelect={handleTileSelect}
            setShowBlankTile={setShowBlankTile}
          />
        )}
      </div>
      <Button
        className="pl-[6px] group justify-start items-center hover:bg-transparent rounded-none [&_svg]:size-[20px]"
        variant="ghost"
        onClick={() => handleCreateTile()}
      >
        <span className="flex items-center">
          <span className="relative flex items-center justify-center mb-[3px] mr-[3px]">
            <AddTilePlus className="group-hover:hidden" />
            <AddTileSquarePlus className="hidden group-hover:block" />
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-blue-600 ml-2">
            Add tile
          </span>
        </span>
      </Button>
    </main>
  );
}
