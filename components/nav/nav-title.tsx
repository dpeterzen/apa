"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, LayoutDashboard, Minimize2, Minus, Pin } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SquarePlusIcon } from "../icons/square-plus"

export function NavTitle() {
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
            <LayoutDashboard
              // className={`size-7 transition-transform duration-300 ${isHovered ? 'rotate-90' : 'rotate-0'}`}
              // className={`size-7 transition-transform duration-300 ${isHovered ? 'rotate-90 ease-out' : 'rotate-0 ease-in'}`}
              className={`size-7`}
            />
          </div>
          <h1 className="font-semibold text-[16px]">TidyRecall</h1>
          <div className={`ml-auto transition-opacity duration-200  ${!isHovered ? 'opacity-0' : 'opacity-100 '}`}>close</div>
          <Pin />

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
