"use client"

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavActions } from "@/components/nav/nav-actions";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function NavHeader() {
  const { state, isMobile } = useSidebar();
  const pathname = usePathname();
  const currentWallId = pathname.split("/").pop() || "";
  const currentWall = useQuery(api.walls.getUserWall, { id: currentWallId });

  return (
    <header className="sticky top-0 z-50 bg-background flex h-14 shrink-0 items-center pl-2 pr-[10px]">
      {(state === "collapsed" || isMobile) &&
        <>
          <SidebarTrigger className="-ml-0 mr-[2px]" />
        </>
      }
      <div className="flex-1 flex">
        <Button variant="ghost" size="sm" className="font-semibold">
          {currentWall?.title}
        </Button>
      </div>
      <div className="ml-auto">
        <NavActions />
      </div>
    </header>
  )
}