"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import React from "react";

type TileSize = "small" | "medium" | "large";
type ContentType = "note" | "video" | "image";

interface Tile {
  id: string;
  type: ContentType;
  size: TileSize;
  content: string;
}

// components/ContentTile.tsx
import cn from "classnames";

const MOCK_TILES: Tile[] = [
  {
    id: "1",
    type: "note",
    size: "large",
    content: "Large Note Content",
  },
  {
    id: "2",
    type: "video",
    size: "medium",
    content: "Medium Video Content",
  },
  {
    id: "3",
    type: "image",
    size: "small",
    content: "Small Image Content",
  },
  {
    id: "4",
    type: "note",
    size: "medium",
    content: "Medium Note Content",
  },
  {
    id: "5",
    type: "video",
    size: "large",
    content: "Large Video Content",
  },
];

// xs (<640px): Full width (12 cols)
// sm (≥640px): Various widths
// md (≥768px): More columns
// lg (≥1024px): Most columns
const sizeClasses = {
  small: {
    note: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2",
    video: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-1",
    image: "sm:col-span-4 md:col-span-4 lg:col-span-2 col-span-6 row-span-2 ",
  },
  medium: {
    note: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3",
    video:
      "col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3 sm:row-span-2 md:row-span-2 lg:row-span-2 2xl:row-span-3",
    image: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2",
  },
  large: {
    note: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-7 lg:row-span-9 2xl:row-span-10",
    video:
      "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3 sm:row-span-3 md:row-span-4 lg:row-span-4 2xl:row-span-5",
    image: "col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3",
  },
};

function ContentTile({ tile }: { tile: Tile }) {
  return (
    <div
      className={cn(
        "rounded-xl border",
        sizeClasses[tile.size][tile.type]
      )}
    >
      {tile.content}
    </div>
  );
}

export default function WallIdPage({
  params,
}: {
  params: Promise<{ wallId: string }>;
}) {
  const resolvedParams = React.use(params);
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [tiles, setTiles] = React.useState<Tile[]>(MOCK_TILES);

  // Not authenticated, redirect immediately
  if (!isLoading && !isAuthenticated) {
    redirect("/");
  }

  // Query only if authenticated
  const hasAccess = useQuery(
    api.walls.checkWallAccess,
    isAuthenticated ? { wallId: resolvedParams.wallId } : "skip"
  );

  // Show loading state
  if (isLoading || (isAuthenticated && hasAccess === undefined)) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  // Invalid wall ID or no access
  if (!hasAccess) {
    redirect("/wall"); // Redirect to wall list
  }

  // User has access, render wall content
  return (
    <main className="flex flex-1 flex-col gap-2 p-2 pt-0">
      <div className="grid grid-cols-12 auto-rows-[100px] gap-2">
        {tiles.map((tile) => (
          <ContentTile key={tile.id} tile={tile} />
        ))}
        <div className="sm:col-span-4 md:col-span-5 lg:col-span-3 2xl:col-span-2 col-span-6 row-span-2 rounded-xl border border-dashed h-full text-sm ">
          <div className="flex h-full items-center justify-center">
            <span>Shortcut Tile</span>
          </div>
        </div>
      </div>
    </main>
  );
}
