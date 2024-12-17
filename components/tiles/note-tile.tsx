import { useState, useCallback, useEffect } from "react";
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
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash"; 
import { TileSize, SIZES } from "@/types";

interface NoteTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function NoteTile({
  tileId,
  wallId,
  size,
}: NoteTileProps) {
  // group hooks at the top
  const noteData = useQuery(api.tiles.getNoteContent, { tileId });
  const updateNote = useMutation(api.tiles.updateNoteContent);
  const deleteTile = useMutation(api.tiles.deleteTile);
  const updateTileSize = useMutation(api.tiles.updateTileSize);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // sync state with query data - effects after hooks
  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
    }
  }, [noteData]);

  // callbacks after effects
  const debouncedUpdate = useCallback(
    debounce((newTitle: string, newContent: string) => {
      updateNote({
        tileId,
        title: newTitle,
        content: newContent,
      });
    }, 500),
    [tileId]
  );
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdate(newTitle, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedUpdate(title, newContent);
  };

  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId,
    });
  };

  // loading check after all hooks
  // if (!noteData) {
  //   return <div className="px-3 py-2">Loading...</div>;
  // }

  const handleSizeChange = async (direction: "increase" | "decrease") => {
    const currentIndex = SIZES.indexOf(size as TileSize);
    let newIndex;

    if (direction === "increase") {
      newIndex =
        currentIndex < SIZES.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    if (newIndex !== currentIndex) {
      await updateTileSize({
        tileId,
        size: SIZES[newIndex],
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
        onClick={() => handleSizeChange("increase")}
      >
        <Plus className="" />
      </Button>
      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[28px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => handleSizeChange("decrease")}
      >
        <Minus className="" />
      </Button>
      {/* side tile actions end */}

      <Input
        placeholder=""
        value={title}
        title={title}
        onChange={handleTitleChange}
        className="font-semibold border-transparent rounded-xl"
      />
      <Textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 resize-none border-transparent rounded-xl"
      />
    </div>
  );
}
