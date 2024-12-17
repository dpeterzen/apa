import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { WallSelector } from "../tiles/wall-selector"
import { TileTypeSelector } from "../tiles/tile-type-selector"
import { Id } from "@/convex/_generated/dataModel"
import { SquarePlusIcon } from "@/components/icons/square-plus"
import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

type TileType = "note"

interface TileCreationDialogProps {
  onCreateTile: (wallId: Id<"walls">, type: TileType) => void
}

export function TileCreationDialog({ onCreateTile }: TileCreationDialogProps) {
  const [selectedWallId, setSelectedWallId] = useState<Id<"walls">>()
  const [selectedType, setSelectedType] = useState<TileType>()
  const [isOpen, setIsOpen] = useState(false)

  const handleCreate = () => {
    if (selectedWallId && selectedType) {
      onCreateTile(selectedWallId, selectedType)
      setIsOpen(false)
      setSelectedWallId(undefined)
      setSelectedType(undefined)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      <SidebarMenuButton>
          <span className="text-blue-500 font-semibold flex items-center">
            <SquarePlusIcon className="size-7 ml-[-2px] mr-1" />
            Add tile
          </span>
          </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <WallSelector 
            value={selectedWallId}
            onValueChange={setSelectedWallId}
          />
          <TileTypeSelector 
            value={selectedType}
            onValueChange={setSelectedType}
          />
          <Button 
            onClick={handleCreate}
            disabled={!selectedWallId || !selectedType}
            className="w-full"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}