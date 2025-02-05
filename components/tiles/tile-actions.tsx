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
        className="z-[50] rounded-md absolute top-[0px] right-[0px] h-5 w-[18px] p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-50"
        variant="secondary"
      >
        <Square />
      </Button>

      <Button
        variant="segmented-end"
        className="z-[50] rounded-r-full absolute bottom-[-1px] left-[27px] h-6 w-7 p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-50"
        onClick={() => onPositionChange("increase")}
      >
        <ChevronRight />
      </Button>
      <Button
        className="z-[50] rounded-l-full absolute bottom-[-1px] left-[0px] h-6 w-7 p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-50"
        variant="segmented"
        onClick={() => onPositionChange("decrease")}
      >
        <ChevronLeft />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className="z-50 rounded-full absolute bottom-[-1px] right-[0px] h-6 w-6 p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <MoreVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-40 p-2 rounded-xl"
          align="start"
          side="left"
        >
          {children}
          <div
            role="button"
            onClick={onDelete}
            className="flex items-center px-2 py-1.5 text-sm text-red-600 rounded-md cursor-pointer hover:bg-accent/40 dark:hover:bg-accent/50"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </div>
        </PopoverContent>
      </Popover>

      <Button
        className="z-[50] rounded-r-full absolute bottom-[-1px] right-[31px] h-6 w-7 p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-50"
        variant="segmented-end"
        onClick={() => onSizeChange("increase")}
      >
        <Plus />
      </Button>
      <Button
        variant="segmented"
        className="z-[50] rounded-l-full absolute bottom-[-1px] right-[59px] h-6 w-7 p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-50"
        onClick={() => onSizeChange("decrease")}
      >
        <Minus />
      </Button>
    </>
  );
}
