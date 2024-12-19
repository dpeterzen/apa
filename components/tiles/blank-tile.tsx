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
import { Image as ImageIcon, SendHorizontal, Smile, SquarePen, X } from "lucide-react";

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
    <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5 row-span-3 flex items-center justify-center">
      <Command className="rounded-xl border">
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
              <span>Image</span>
            </CommandItem>
            <CommandItem disabled>
              <Smile />
              <span>File Upload</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default BlankTile;
