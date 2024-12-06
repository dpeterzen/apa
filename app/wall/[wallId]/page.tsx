"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import React from "react";

export default function WallIdPage({
  params,
}: {
  params: Promise<{ wallId: string }>;
}) {
  const resolvedParams = React.use(params);
  const { isAuthenticated, isLoading } = useConvexAuth();

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


  return (
    <main className="flex flex-1 flex-col gap-2 p-2 pt-0">
      {tiles?.map((tile) => (
        <div key={tile._id} className="p-4 border-b last:border-b-0">
          <div className="font-medium text-white">
            Wall ID: {tile.wallId}
          </div>
          <div className="text-sm text-muted-foreground">
            User ID: {tile.userId}
          </div>
          <div className="text-sm text-muted-foreground">
            Type: {tile.type}
          </div>
          <div className="text-sm text-muted-foreground">
            Created: {new Date(tile.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </main>
  );
}
