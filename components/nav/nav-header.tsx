"use client"

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavActions } from "@/components/nav/nav-actions";
import { Button } from "../ui/button";

export function NavHeader() {
  const { state, isMobile } = useSidebar();

  return (
    <header className="flex h-14 shrink-0 items-center pl-2 pr-[10px]">
      {(state === "collapsed" || isMobile) &&
        <>
          <SidebarTrigger className="-ml-0 mr-[2px]" />
        </>
      }
      <div className="flex-1 flex">
      <Button variant="ghost" size="sm" className="font-semibold">TEST WALL NAME</Button>

      </div>
      <div className="ml-auto">
        <NavActions />
      </div>
    </header>
  )
}