import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  MessageSquare,
  MessageSquareX,
  Minus,
  MoreHorizontal,
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

interface TileActionsProps {
  onSizeChange: (direction: "increase" | "decrease") => void;
  onPositionChange: (direction: "increase" | "decrease") => void;
  onDelete: () => void;
  onCommentToggle: () => void;
  showComments: boolean;
  children?: ReactNode; // For popover content
  size: TileSize;
}

export function TileActions({
  onSizeChange,
  onPositionChange,
  onDelete,
  onCommentToggle,
  showComments,
  children,
}: TileActionsProps) {
  return (
    <>
      <Button
        className="z-[50] rounded-full absolute top-[-5px] right-[-5px] h-[36px] w-[36px] p-0 transition-opacity hover:opacity-100 group-hover:opacity-50
        [&:not(:hover)]:opacity-20"
        variant="ghost2"
      >
        <Circle />
      </Button>

      <Button
        variant="outline1"
        className="z-[52] rounded-full absolute bottom-[-30px] left-[0px] h-6 w-6 p-0"
        onClick={onCommentToggle}
      >
        {showComments ? <MessageSquareX /> : <MessageSquare />}
      </Button>

      <Button
        variant="segmented-end"
        className="z-[50] rounded-r-full absolute bottom-[-30px] left-[59px] h-6 w-7 p-0 "
        onClick={() => onPositionChange("increase")}
      >
        <ChevronRight />
      </Button>
      <Button
        className="z-[50] rounded-l-full absolute bottom-[-30px] left-[31px] h-6 w-7 p-0 "
        variant="segmented"
        onClick={() => onPositionChange("decrease")}
      >
        <ChevronLeft />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline1"
            className="z-50 rounded-full absolute bottom-[-30px] right-[0px] h-6 w-6 p-0 "
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-40 rounded-xl"
          align="start"
          side="left"
        >
          {children}
          <div
            role="button"
            onClick={onDelete}
            className="flex items-center px-2 py-1.5 text-sm text-red-600 rounded-md cursor-pointer hover:bg-accent/40 dark:hover:bg-accent/20"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </div>
        </PopoverContent>
      </Popover>

      <Button
        className="z-[50] rounded-r-full absolute bottom-[-30px] right-[31px] h-6 w-7 p-0 "
        variant="segmented-end"
        onClick={() => onSizeChange("increase")}
      >
        <Plus />
      </Button>
      <Button
        variant="segmented"
        className="z-[50] rounded-l-full absolute bottom-[-30px] right-[59px] h-6 w-7 p-0 "
        onClick={() => onSizeChange("decrease")}
      >
        <Minus />
      </Button>
    </>
  );
}
