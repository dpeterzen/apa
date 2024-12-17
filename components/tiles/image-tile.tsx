import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ImageTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function ImageTile({ tileId, wallId, size }: ImageTileProps) {
  const deleteTile = useMutation(api.tiles.deleteTile);

  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId,
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="z-100 rounded-full absolute top-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
          >
            <MoreHorizontal />
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
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
          Image
        </div>
      </div>
    </div>
  );
}