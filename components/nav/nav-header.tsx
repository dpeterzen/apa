"use client"

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavActions } from "@/components/nav/nav-actions";

export function NavHeader() {
  const { state, isMobile } = useSidebar();

  return (
    <header className="flex h-14 shrink-0 items-center pl-3 pr-[10px]">
      {(state === "collapsed" || isMobile) &&
        <>
          <SidebarTrigger className="-ml-1" />
        </>
      }
      <div className="ml-auto">
        <NavActions />
      </div>
    </header>
  )
}