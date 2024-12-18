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
  const imageData = useQuery(api.tiles.getImageUrl, { tileId });
  const [showUrlPopover, setShowUrlPopover] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
  }, [imageData]);

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

  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId,
    });
  };

  return (
    <div className="h-full flex flex-col pr-[22px] relative">
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
                placeholder="Enter image URL..."
                className="h-8"
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
          <div className="absolute top-0 left-0 z-10 bg-black/50 p-1 text-xs text-white rounded-xl">
            Tile image
          </div>
            <Image
              src={imageUrl}
              alt="Tile image"
              fill
              className={`
                object-contain transition-opacity duration-300
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
