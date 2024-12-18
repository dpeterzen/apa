import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Minus, MoreHorizontal, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TileSize } from "@/types";
import { ReactNode } from "react";

interface TileActionsProps {
  onSizeChange: (direction: "increase" | "decrease") => void;
  onPositionChange?: (direction: "increase" | "decrease") => void;
  children?: ReactNode; // For popover content
  size: TileSize;
}

export function TileActions({ 
  onSizeChange, 
  onPositionChange, 
  children,
}: TileActionsProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="z-50 rounded-full absolute top-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1 rounded-xl" align="end">
          {children}
        </PopoverContent>
      </Popover>

      {onPositionChange && (
        <>
          <Button
            variant="ghost"
            className="z-100 rounded-full absolute bottom-[57px] right-[-1px] h-6 w-6 p-0 text-muted"
            onClick={() => onPositionChange("decrease")}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            className="z-100 rounded-full absolute bottom-[86px] right-[-1px] h-6 w-6 p-0 text-muted"
            onClick={() => onPositionChange("increase")}
          >
            <ChevronRight />
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => onSizeChange("increase")}
      >
        <Plus />
      </Button>
      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[28px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => onSizeChange("decrease")}
      >
        <Minus />
      </Button>
    </>
  );
}