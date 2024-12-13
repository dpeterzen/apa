import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button 
        variant="ghost" 
        className="z-100 rounded-tr-xl rounded-tl-none rounded-br-none absolute top-[-1px] right-[-1px] h-6 w-6 p-0 data-[state=open]:bg-accent"
      >
        <MoreHorizontal className="h-6 w-6" />
      </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600 focus:bg-red-100"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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