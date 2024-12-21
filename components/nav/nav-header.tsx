"use client"

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavActions } from "@/components/nav/nav-actions";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { redirect } from 'next/navigation';
import { WallTitle } from "@/components/walls/wall-title";

export function NavHeader() {
  const { state, isMobile } = useSidebar();
  const pathname = usePathname();
  const pathWallId = pathname.split("/").pop() || "";
  
  // Only query if the ID looks valid
  const isValidId = pathWallId.length > 10; // Convex IDs are longer than this
  const currentWall = useQuery(
    api.walls.getUserWall, 
    isValidId ? { id: pathWallId as Id<"walls"> } : "skip"
  );
  if (isValidId && currentWall === null) {
    // Wall doesn't exist, redirect to walls list
    redirect('/wall');
}

  return (
    <header className="sticky top-0 z-50 bg-background flex h-[48px] shrink-0 items-center px-[14px]">
      {(state === "collapsed" || isMobile) && (
        <SidebarTrigger className="-ml-0 mr-[2px]" />
      )}
      <div className="flex-1 flex">
        {currentWall && (
          <WallTitle 
            wallId={currentWall._id} 
            title={currentWall.title} 
          />
        )}
      </div>
      <div className="ml-auto">
        <NavActions />
      </div>
    </header>
  )
}