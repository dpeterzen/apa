import { Id } from "@/convex/_generated/dataModel";
import { Image as ImageIcon, Loader2, Trash } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isDomainAllowed } from "@/utils/domain-validation";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import { Button } from "../ui/button";

const MAX_ALT_TEXT_LENGTH = 125;

interface ImageTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function ImageTile({ tileId, wallId, size }: ImageTileProps) {
  const { handleSizeChange, handlePositionChange } = useTileActions({
    tileId,
    wallId,
    size,
  });
  const deleteTile = useMutation(api.tiles.deleteTile);
  const updateImageUrl = useMutation(api.tiles.updateImageUrl);
  const updateAltText = useMutation(api.tiles.updateImageTileAltText);
  const altText = useQuery(api.tiles.getAltText, { tileId });
  const imageData = useQuery(api.tiles.getImageUrl, { tileId });
  const [showUrlPopover, setShowUrlPopover] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showAltTextPopover, setShowAltTextPopover] = useState(false);
  const [currentAltText, setCurrentAltText] = useState("");

  const handleImageError = () => {
    setHasError(true);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setHasError(false);
    setIsImageLoading(false);
  };

  useEffect(() => {
    if (imageData) {
      setImageUrl(imageData);
    }
    if (altText !== undefined) {
      setCurrentAltText(altText || "");
    }
  }, [imageData, altText]);

  const handleImageUrlUpdate = async () => {
    if (!isDomainAllowed(imageUrl)) {
      console.log("Invalid domain");
      return;
    }
    await updateImageUrl({
      tileId,
      imageUrl,
    });
    setShowUrlPopover(false);
  };

  const handleAltTextUpdate = async () => {
    const trimmedText = currentAltText.slice(0, MAX_ALT_TEXT_LENGTH);
    await updateAltText({
      tileId,
      altText: trimmedText,
    });
    setCurrentAltText(trimmedText);
    setShowAltTextPopover(false);
  };

  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId,
    });
  };

  return (
    <div className="h-full flex flex-col pr-[22px] pt-[22px] pb-[19px] relative">
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        size={size}
      >
        <Popover open={showUrlPopover} onOpenChange={setShowUrlPopover}>
          <PopoverTrigger asChild>
            <div
              role="button"
              className="flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-accent"
            >
              <Link className="mr-2 h-4 w-4" />
              Image link
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-xl p-1" align="center">
            <div className="flex flex-col gap-2">
              <Input
                className="h-8 border-0"
                placeholder="Enter image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleImageUrlUpdate();
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <div
          role="button"
          onClick={handleDelete}
          className="flex items-center px-2 py-1.5 text-sm text-red-600 rounded-md cursor-pointer hover:bg-accent"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </div>
      </TileActions>

      <div className="flex-1 flex items-center justify-center relative">
        {!imageUrl && (
          <div className="flex items-center justify-center mr-[-25px]">
            <ImageIcon className="size-10 text-muted-foreground/30" />
          </div>
        )}

        {(!imageData || !imageUrl || isImageLoading) &&
          isDomainAllowed(imageUrl) && (
            <div className="flex items-center justify-center mr-[-25px]">
              <Loader2 className="animate-spin size-10" />
            </div>
          )}

        {imageUrl && !isDomainAllowed(imageUrl) && (
          <div className="text-sm text-muted-foreground text-center px-4 ml-[15px]">
            This image domain is not allowed. Please use a supported image host.
          </div>
        )}

        {imageUrl && isDomainAllowed(imageUrl) && (
          <>
            <Popover
              open={showAltTextPopover}
              onOpenChange={setShowAltTextPopover}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-[-22px] left-1 z-10 font-extralight tracking-tight text-sm h-[18px] hover:h-fit transition-all duration-100 rounded-md max-w-[calc(100%-8px)] group overflow-hidden"
                >
                  <div className="h-[18px] group-hover:h-fit overflow-hidden group-hover:overflow-y-auto">
                    <span className={`truncate group-hover:whitespace-normal group-hover:break-words block w-full text-left transition-all duration-100 ${currentAltText ? '' : 'text-muted  group-hover:text-current'}`}>
                      {currentAltText || "image name"}
                    </span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 rounded-xl p-1"
                align="center"
                side="top"
                sideOffset={-59}
              >
                <div className="flex flex-col gap-2">
                  <Input
                    className="h-8 border-0"
                    placeholder="Enter image name..."
                    maxLength={MAX_ALT_TEXT_LENGTH}
                    value={currentAltText}
                    onChange={(e) => setCurrentAltText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAltTextUpdate();
                      }
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-[-20px] left-1 z-10 font-extralight tracking-tight text-muted text-sm h-[18px] rounded-md"
            >
              caption
            </Button>
            <Image
              src={imageUrl}
              alt={currentAltText || "Tile image"}
              fill
              className={`
                object-contain transition-opacity duration-300 rounded-xl
                ${isImageLoading || hasError ? "opacity-0" : "opacity-100"}
              `}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes={`(max-width: 768px) 100vw, ${size === "small"
                ? "200px"
                : size === "medium"
                  ? "400px"
                  : "600px"
                }`}
            />
            {hasError && (
              <div className="text-sm text-muted-foreground text-center ml-[15px]">
                Unable to load image. Please check the URL and try again.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
