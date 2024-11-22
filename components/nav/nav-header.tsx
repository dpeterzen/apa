"use client"

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavActions } from "@/components/nav/nav-actions";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export function NavHeader() {
  const { state } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center border-b px-4">
      {state === "collapsed" && 
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
