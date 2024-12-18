"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon } from "../icons/layout-dashboard"
import PanelLeft from "../icons/panel-left"
import { TileCreationDialog } from "@/components/dialogs/tile-creation-dialog"

export function NavTitle() {
  const { toggleSidebar } = useSidebar()
  const [isHovered, setIsHovered] = useState(false)
  const createTile = useMutation(api.tiles.create)

  const handleCreateTile = async (wallId: Id<"walls">, type: "note") => {
    await createTile({
      wallId,
      type,
      size: "medium", // Default size
      position: 0, // Default position
      title: "", // Default title
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="group gap-1 py-0"
          onClick={() => {
            toggleSidebar()
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            <LayoutDashboardIcon className={`size-6`} />
          </div>
          <h1 className="font-semibold text-[16px]">TileRecall</h1>
          <div className={`ml-auto mr-[2px] transition-opacity duration-200 text-muted-foreground text-xs ${!isHovered ? 'opacity-0' : 'opacity-100'}`}>
            hide
          </div>
          <div className="[&_svg]:size-5">
            <PanelLeft />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="mt-[7px]">
        <TileCreationDialog onCreateTile={handleCreateTile} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}