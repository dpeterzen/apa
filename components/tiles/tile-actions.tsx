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
      <Button
        className="z-[50] rounded-full absolute top-[-1px] right-[-1px] h-6 w-6 p-0"
        variant="ghost"
      >
        <Square />
      </Button>

      <Button
        variant="ghost"
        className="z-[50] rounded-full absolute bottom-[0px] left-[23px] h-6 w-6 p-0"
        onClick={() => onPositionChange("increase")}
      >
        <ChevronRight />
      </Button>
      <Button
        className="z-[50] rounded-full absolute bottom-[0px] left-[-1px] h-6 w-6 p-0"
        variant="ghost"
        onClick={() => onPositionChange("decrease")}
      >
        <ChevronLeft />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="z-50 rounded-full absolute bottom-[0px] right-[-1px] h-6 w-6 p-0 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-40 p-1 rounded-xl"
          align="start"
          side="left"
        >
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
        className="z-[50] rounded-full absolute bottom-[0px] right-[23px] h-6 w-6 p-0"
        variant="ghost"
        onClick={() => onSizeChange("increase")}
      >
        <Plus />
      </Button>
      <Button
        variant="ghost"
        className="z-[50] rounded-full absolute bottom-[0px] right-[47px] h-6 w-6 p-0"
        onClick={() => onSizeChange("decrease")}
      >
        <Minus />
      </Button>
    </>
  );
}
