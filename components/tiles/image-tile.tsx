import { Id } from "@/convex/_generated/dataModel";
import { ImagePlus, Loader2 } from "lucide-react";
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

const isGifUrl = (url: string) => {
  return url.toLowerCase().endsWith(".gif");
};

export function ImageTile({ tileId, wallId, size }: ImageTileProps) {
  const { handleSizeChange, handlePositionChange, handleDelete } =
    useTileActions({
      tileId,
      wallId,
      size,
    });
  const updateImageUrl = useMutation(api.imageTiles.updateImageUrl);
  const updateAltText = useMutation(api.imageTiles.updateImageTileAltText);
  const altText = useQuery(api.imageTiles.getAltText, { tileId });
  const imageData = useQuery(api.imageTiles.getImageUrl, { tileId });
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

  return (
    <>
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        size={size}
      >
        <Popover open={showUrlPopover} onOpenChange={setShowUrlPopover}>
          <PopoverTrigger asChild>
            <div
              role="button"
              className="flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-accent/40 dark:hover:bg-accent/20"
            >
              <Link className="mr-2 h-4 w-4" />
              Image link
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="max-w-[90vw] w-80 rounded-lg p-1"
            align="center"
          >
            <div className="flex flex-col gap-2">
              <Input
                className="h-7 border-0 p-[2px] min-w-0 w-full"
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
      </TileActions>

      <div className={`flex-1 flex items-center justify-center relative rounded-xl dark:border-none ${imageUrl ? "border-none" : "border border-[hsl(var(--border-3))]"}  bg-inherit dark:bg-accent/70`}>
        {!imageUrl && (
          <Button variant="ghost1" size="lgIcon" className="flex items-center justify-center [&_svg]:size-10 text-muted-foreground hover:!text-accent-foreground">
            <ImagePlus className="size-10" />
          </Button>
        )}

        {(!imageData || !imageUrl || isImageLoading) &&
          isDomainAllowed(imageUrl) && (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin size-10" />
            </div>
          )}

        {imageUrl && !isDomainAllowed(imageUrl) && (
          <div className="text-sm text-muted-foreground text-center px-1 mr-[2px]">
            This image domain is not allowed. Please use a supported image host.
          </div>
        )}
        <Popover open={showAltTextPopover} onOpenChange={setShowAltTextPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost2"
              size="sm"
              className={`absolute top-[0] left-0 z-10 font-extralight tracking-tight text-sm h-[20px] hover:h-fit transition-all duration-100 rounded-md rounded-tl-xl rounded-tr-none rounded-bl-none max-w-[calc(100%-22px)] group overflow-hidden mr-[18px] pr-[7px] ${currentAltText && "bg-accent/70 dark:bg-accent/40 text-foreground/80 dark:text-foreground hover:!text-accent-foreground"}`}
            >
              <div className="h-[20px] group-hover:h-fit overflow-hidden group-hover:overflow-y-auto">
                <span
                  className={`truncate group-hover:whitespace-normal group-hover:break-words block w-full text-left transition-all duration-100 ${currentAltText ? "font-medium" : "text-[hsl(var(--muted-2))] group-hover:text-current"}`}
                >
                  {currentAltText || "name"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="max-w-[90vw] w-80 rounded-md p-1"
            align="start"
            side="top"
            sideOffset={-56}
          >
            <div className="flex flex-col gap-2">
              <Input
                className="h-7 border-0 p-[2px] min-w-0 w-full"
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
          className="absolute bottom-[0px] left-0 z-10 font-extralight tracking-tight text-[hsl(var(--muted-2))] text-sm h-[18px] rounded-xl"
        >
          caption{" "}
        </Button>
        {imageUrl && isDomainAllowed(imageUrl) && (
          <>
            <Image
              src={imageUrl}
              alt={currentAltText || "Tile image"}
              fill
              unoptimized={isGifUrl(imageUrl)}
              className={`
                object-cover transition-opacity duration-300 rounded-xl
                ${isImageLoading || hasError ? "opacity-0" : "opacity-100"}
              `}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes={`(max-width: 768px) 100vw, ${
                size === "small"
                  ? "200px"
                  : size === "medium"
                    ? "400px"
                    : "600px"
              }`}
            />
            {hasError && (
              <div className="text-sm text-muted-foreground text-center px-1 mr-[2px]">
                Unable to load image. Please check the URL and try again.
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
