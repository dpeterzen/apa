"use client"

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSidebar } from "@/components/ui/sidebar";

interface WallTitleProps {
  wallId: Id<"walls">;
  title: string;
}

export function WallTitle({ wallId, title }: WallTitleProps) {
  const [showTitlePopover, setShowTitlePopover] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const updateTitle = useMutation(api.walls.updateTitle);
  const { state, isMobile } = useSidebar();

  useEffect(() => {
    setEditableTitle(title);
  }, [title]);

  const handleTitleUpdate = async () => {
    if (!editableTitle.trim()) return;

    try {
      await updateTitle({
        wallId,
        title: editableTitle
      });
      setShowTitlePopover(false);
    } catch (error) {
      console.error("Failed to update title:", error);
    }
  };

  const getMaxWidth = () => {
    if (isMobile || state === "collapsed") {
      return "calc(100vw - 80px)"; // Collapsed sidebar width
    }
    return "calc(100vw - 350px)"; // Expanded sidebar width
  };

  return (
      <Popover open={showTitlePopover} onOpenChange={setShowTitlePopover}>
        <PopoverTrigger asChild>
          <Button style={{ maxWidth: getMaxWidth() }}
            variant="ghost"
            size="sm"
            title={title}
            className="overflow-hidden font-semibold h-[28px] !text-[18px] !leading-[27px] rounded-md"
          >
            <span className="truncate block w-full text-left">
              {title}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 rounded-xl p-1" align="start">
          <div className="flex flex-col gap-2">
            <Input
              className="dark:text-zinc-300 w-full flex-grow min-h-[33px] py-1 px-[2px] !text-[18px] !leading-[27px] font-bold overflow-hidden whitespace-nowrap border-0"
              placeholder="Enter wall title..."
              maxLength={100}
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleUpdate();
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
  );
}