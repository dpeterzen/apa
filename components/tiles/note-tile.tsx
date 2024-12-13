import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface NoteTileProps {
  tileId: Id<"baseTiles">
  initialTitle?: string
  initialContent?: string
  wallId: Id<"walls">
}

export function NoteTile({ tileId, wallId, initialTitle = "", initialContent = "" }: NoteTileProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const deleteTile = useMutation(api.tiles.deleteTile);
  
  const handleDelete = async () => {
    await deleteTile({ 
      tileId, 
      wallId 
    });
  };


  return (
    <div className="h-full flex flex-col pr-[12px] relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            className="z-100 rounded-full absolute top-[-1px] right-[-1px] h-6 w-6 p-0"
          >
            <MoreHorizontal className="h-6 w-6" />
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