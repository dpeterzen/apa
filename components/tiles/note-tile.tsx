import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Minus, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface NoteTileProps {
  tileId: Id<"baseTiles">
  initialTitle?: string
  initialContent?: string
  wallId: Id<"walls">
  size: "small" | "medium" | "large";
}

export function NoteTile({ tileId, wallId, initialTitle = "", initialContent = "", size }: NoteTileProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const deleteTile = useMutation(api.tiles.deleteTile);

  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId
    });
  };

  const updateTileSize = useMutation(api.tiles.updateTileSize);

  const SIZES = ["small", "medium", "large"] as const;
  type TileSize = typeof SIZES[number];
  
  const handleSizeChange = async (direction: 'increase' | 'decrease') => {
    const currentIndex = SIZES.indexOf(size as TileSize);
    let newIndex;
  
    if (direction === 'increase') {
      newIndex = currentIndex < SIZES.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }
  
    if (newIndex !== currentIndex) {
      await updateTileSize({
        tileId,
        size: SIZES[newIndex]
      });
    }
  };


  return (
    <div className="h-full flex flex-col pr-[12px] relative">
      {/* side tile actions start */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="z-100 rounded-full absolute top-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
          >
            <MoreHorizontal className="" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1 rounded-xl" align="end">
          <div
            role="button"
            onClick={handleDelete}
            className="flex items-center px-2 py-1.5 text-sm text-red-600 rounded-md cursor-pointer hover:bg-accent"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => handleSizeChange('increase')}
      >
        <Plus className="" />
      </Button>
      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[28px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => handleSizeChange('decrease')}
      >
        <Minus className="" />
      </Button>
      {/* side tile actions end */}

      <Input
        placeholder="Start typing..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="font-semibold border-transparent rounded-xl"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 resize-none border-transparent rounded-xl"
      />
    </div>
  )
}