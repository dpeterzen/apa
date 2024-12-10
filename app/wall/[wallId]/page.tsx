"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import React from "react";
import { Plus } from "lucide-react";

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
      <div className="grid grid-cols-12 auto-rows-[100px] gap-3">

        <div className="sm:col-span-4 md:col-span-5 lg:col-span-3 2xl:col-span-2 col-span-6 row-span-2 rounded-md border-2 border-dashed border-zinc-500 h-full text-sm">
            <div className="flex h-full items-center justify-center">
            <Plus strokeWidth={2} size={22} className="text-blue-500 mr-2 -ml-2" /><span className="text-muted-foreground">Add tile</span>
            </div>
        </div>
      </div>
    </main>
  );
}
