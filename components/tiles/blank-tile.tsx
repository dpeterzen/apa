import { useEffect, useRef, useState } from "react";
import { TileType } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  ImagePlay,
  Paperclip,
  SendHorizontal,
  SquareArrowOutUpRight,
  SquarePen,
  X,
} from "lucide-react";
import * as motion from "motion/react-client";

interface BlankTileProps {
  onSelect: (type: TileType, options?: { title?: string }) => void;
  setShowBlankTile: (show: boolean) => void;
}

const BlankTile = ({ onSelect, setShowBlankTile }: BlankTileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const isURL = (text: string) => {
    if (!text) return false;

    // More comprehensive URL pattern
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "localhost|" + // localhost
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );

    // console.log("URL Check:", text, urlPattern.test(text));
    return urlPattern.test(text);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      layoutId="blank-tile"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: {
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 25,
        },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-5 row-span-3 flex items-center justify-center "
    >
      <Command className="rounded-xl border shadow-inner">
        <div className="flex items-center px-3 w-full">
          <div className="flex-1 min-w-0">
            <CommandInput
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="Start typing, paste urls or choose a tile..."
              className="w-full"
            />
          </div>
          <div className="flex gap-2 ml-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBlankTile(false)}
              className=""
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelect("note")}
              className=""
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CommandList>
          <CommandEmpty className="p-1">
            {inputValue && !isURL(inputValue) && (
              <>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground text-start">
                  Suggestions
                </div>
                <button
                  onClick={() => onSelect("note", { title: inputValue })}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground w-full"
                >
                  <SquarePen className="mr-2 h-4 w-4" />
                  <span>Add note titled &quot;{inputValue}&quot;</span>
                </button>
              </>
            )}
          </CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                onSelect("note");
              }}
            >
              <SquarePen />
              <span>Note</span>
            </CommandItem>
            <CommandItem onSelect={() => onSelect("image")}>
              <ImageIcon />
              <span>Image / GIF</span>
            </CommandItem>
            <CommandItem>
              <ImagePlay />
              <span>Video</span>
            </CommandItem>
            <CommandItem>
              <SquareArrowOutUpRight />
              <span>Link</span>
            </CommandItem>
            <CommandItem disabled>
              <Paperclip />
              <span>File Upload</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </motion.div>
  );
};

export default BlankTile;
