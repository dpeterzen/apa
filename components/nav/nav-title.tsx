"use client"

import { useState } from "react"
import { Pin } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SquarePlusIcon } from "../icons/square-plus"
import { LayoutDashboardIcon } from "../icons/layout-dashboard"
import PanelLeft from "../icons/panel-left"

export function   NavTitle() {
  const { toggleSidebar } = useSidebar()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size={"lg"}
          className="group gap-1"
          onClick={() => {
            toggleSidebar()
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            <LayoutDashboardIcon className={`size-7`} />
          </div>
          <h1 className="font-semibold text-[16px]">TidyRecall</h1>
          <div className={`ml-auto transition-opacity duration-200 text-muted-foreground ${!isHovered ? 'opacity-0' : 'opacity-100 '}`}>close</div>
          <div className="[&_svg]:size-5">
            <PanelLeft />
          </div>

        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="mt-2">
        <SidebarMenuButton>
          <span className="text-blue-500 font-semibold flex items-center">
            <SquarePlusIcon className="size-7 ml-[-2px] mr-1" />
            Add tile
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
