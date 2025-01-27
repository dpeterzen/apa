"use client"

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon } from "../icons/layout-dashboard"
import { TileCreationDialog } from "@/components/dialogs/tile-creation-dialog"

export function NavTitle() {
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
      <div className="flex gap-1 py-2 px-1">
        <LayoutDashboardIcon className={`size-6`} />
        <h1 className="font-semibold text-[16px]">TidyRecall</h1>
      </div>

      </SidebarMenuItem>
      <SidebarMenuItem className="mt-[7px]">
        <TileCreationDialog onCreateTile={handleCreateTile} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}