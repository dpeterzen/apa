"use client"

import { ChevronLeft, LayoutDashboard } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"


export function NavTitle() {
  const { toggleSidebar } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>

        <SidebarMenuButton
          size={"lg"} 
          className="justify-between"
          onClick={() => {
            toggleSidebar()
          }}
        >

          <div><LayoutDashboard className="size-7" /></div>
          <h1 className="font-semibold text-[16px]">TidyRecall</h1>
          <div><ChevronLeft size={18} className="ml-auto" /></div>
        </SidebarMenuButton>

      </SidebarMenuItem>

    </SidebarMenu>
  )
}
