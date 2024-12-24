import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  MoreVertical,
  Plus,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TileSize } from "@/types";
import { ReactNode } from "react";
import Square from "@/components/icons/square";

interface TileActionsProps {
  onSizeChange: (direction: "increase" | "decrease") => void;
  onPositionChange: (direction: "increase" | "decrease") => void;
  onDelete: () => void;
  children?: ReactNode; // For popover content
  size: TileSize;
}

export function TileActions({
  onSizeChange,
  onPositionChange,
  onDelete,
  children,
}: TileActionsProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="z-50 rounded-full absolute top-[28px] right-[-1px] h-6 w-6 p-0 text-muted"
          >
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1 rounded-xl" align="end">
          {children}
          <div
            role="button"
            onClick={onDelete}
            className="flex items-center px-2 py-1.5 text-sm text-red-600 rounded-md cursor-pointer hover:bg-accent"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </div>
        </PopoverContent>
      </Popover>


      <Button
        className="z-[50] rounded-full absolute top-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
        variant="ghost"
      >
        <Square />
      </Button>

      <Button
        variant="ghost"
        className="z-[50] rounded-full absolute top-[57px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => onPositionChange("increase")}
      >
        <ChevronRight />
      </Button>
      <Button
        className="z-[50] rounded-full absolute top-[86px] right-[-1px] h-6 w-6 p-0 text-muted"
        variant="ghost"
        onClick={() => onPositionChange("decrease")}
      >
        <ChevronLeft />
      </Button>


      <Button
        className="z-[50] rounded-full absolute bottom-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
        variant="ghost"
        onClick={() => onSizeChange("increase")}
      >
        <Plus />
      </Button>
      <Button
        variant="ghost"
        className="z-[50] rounded-full absolute bottom-[28px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => onSizeChange("decrease")}
      >
        <Minus />
      </Button>
    </>
  );
}
