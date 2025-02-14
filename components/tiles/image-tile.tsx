import { Id } from "@/convex/_generated/dataModel";
import { Image as ImageIcon, Loader2, Tag } from "lucide-react";
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
import { TileComments } from "./tile-comments";

const MAX_IMAGE_NAME_LENGTH = 125;

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
  const updateTileName = useMutation(api.tiles.updateTileName);
  const updateAltText = useMutation(api.imageTiles.updateImageTileAltText);

  const tileName = useQuery(api.tiles.getTileName, { tileId });
  const imageData = useQuery(api.imageTiles.getImageUrl, { tileId });

  const [showUrlPopover, setShowUrlPopover] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showNamePopover, setShowNamePopover] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [showComments, setShowComments] = useState(false);

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
    if (tileName !== undefined) {
      setCurrentName(tileName || "");
    }
  }, [imageData, tileName]);

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

  const handleNameUpdate = async () => {
    const trimmedText = currentName.slice(0, MAX_IMAGE_NAME_LENGTH);

    await updateTileName({
      tileId,
      name: trimmedText,
    });

    // Keep alt text in sync with name for accessibility
    await updateAltText({
      tileId,
      altText: trimmedText,
    });

    setCurrentName(trimmedText);
    setShowNamePopover(false);
  };

  return (
    <div className="relative h-full">
      <div className="flex flex-col h-full">
        <div
          className={`flex-1 flex items-center justify-center relative rounded-xl dark:border-none ${imageUrl ? "border-none" : "border border-[hsl(var(--border-3))]"} bg-inherit dark:bg-[hsl(var(--accent-tile))]`}
        >
          {!imageUrl && (
            <Button
              variant="ghost1"
              size="lgIcon"
              className="flex items-center justify-center [&_svg]:size-10 text-muted-foreground hover:!text-accent-foreground"
            >
              <ImageIcon className="size-10" />
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
              This image domain is not allowed. Please use a supported image
              host.
            </div>
          )}
          <Popover open={showNamePopover} onOpenChange={setShowNamePopover}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost2"
                size="default"
                className={`h-[28px] absolute top-[0] left-0 z-10 p-1 pl-2 [&_svg]:size-[18px] font-extralight text-sm hover:h-fit transition-all duration-100 rounded-xl rounded-bl-none rounded-tr-none rounded-br-md max-w-[calc(100%-24px)] group overflow-hidden mr-[18px] pr-[7px] ${currentName && "bg-accent/60 dark:bg-accent/40 text-foreground/80 dark:text-foreground hover:!text-accent-foreground"}`}
              >
                <div className="h-[21px] group-hover:h-fit overflow-hidden group-hover:overflow-y-auto">
                  <span
                    className={`truncate group-hover:whitespace-normal group-hover:break-words block w-full text-left transition-all duration-100 ${currentName ? "font-medium" : "text-[hsl(var(--muted-2))] group-hover:text-current"}`}
                  >
                    {currentName || <Tag />}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="max-w-[90vw] w-64 rounded-lg p-1"
              // className="max-w-[90vw] w-64 rounded-lg p-[2px] border-0"
              align="start"
              side="top"
              sideOffset={-63}
            >
              <div className="flex flex-col gap-2">
                <Input
                  className="h-7 border-0 p-[2px] min-w-0 w-full text-sm"
                  // className="h-7 px-2 min-w-0 w-full"
                  placeholder="Tag image..."
                  maxLength={MAX_IMAGE_NAME_LENGTH}
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleNameUpdate();
                    }
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
          {/* <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-[0px] left-0 z-10 font-extralight tracking-tight text-[hsl(var(--muted-2))] text-sm h-[18px] rounded-xl"
        >
          caption{" "}
        </Button> */}
          {imageUrl && isDomainAllowed(imageUrl) && (
            <>
              <Image
                src={imageUrl}
                alt={currentName || "Tile image"}
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
      </div>
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        size={size}
        onCommentToggle={() => setShowComments(!showComments)}
        showComments={showComments}
      >
        <Popover open={showUrlPopover} onOpenChange={setShowUrlPopover}>
          <PopoverTrigger asChild>
            <div
              role="button"
              className="flex items-center px-2 py-1.5 text-sm rounded-lg cursor-pointer hover:bg-accent/40 dark:hover:bg-accent/20"
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
      <TileComments show={showComments} />
    </div>
  );
}
