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
import { Calendar, SendHorizontal, Smile, X } from "lucide-react";

const BlankTile = ({
  onSelect,
  setShowBlankTile,
}: {
  onSelect: (type: TileType) => void;
  setShowBlankTile: (show: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const isURL = (text: string) => {
    const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/i;
    return urlPattern.test(text);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3 flex items-center justify-center">
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
          <CommandEmpty>
            {inputValue && !isURL(inputValue) ? (
              <CommandItem onSelect={() => onSelect("note")} className="px-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Create a note with this text</span>
              </CommandItem>
            ) : (
              "No results found."
            )}
          </CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {onSelect("note")}}
            >
              <Calendar />
              <span>Note</span>
            </CommandItem>
            <CommandItem onSelect={() => onSelect("image")}>
              <Smile />
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