"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, LayoutDashboard, Minimize2, Minus } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavTitle() {
  const { toggleSidebar } = useSidebar()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size={"lg"}
          className="justify-between group"
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
          <div className={`ml-auto ${!isHovered ? 'opacity-0' : 'opacity-100'}`}>close</div>
          {/* <div className={`ml-auto ${!isHovered ? 'opacity-0' : 'opacity-100'}`}>close</div> */}
          
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
