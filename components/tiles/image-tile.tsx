import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Minus, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TileSize, SIZES } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { isDomainAllowed } from '@/utils/domain-validation';

interface ImageTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function ImageTile({ tileId, wallId, size }: ImageTileProps) {
  const updateTileSize = useMutation(api.tiles.updateTileSize);
  const deleteTile = useMutation(api.tiles.deleteTile);
  const updateImageUrl = useMutation(api.tiles.updateImageUrl)
  const imageData = useQuery(api.tiles.getImageUrl, { tileId });
  const [showUrlPopover, setShowUrlPopover] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
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
      imageUrl
    })
    setShowUrlPopover(false)
  }

  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId,
    });
  };

  const handleSizeChange = async (direction: "increase" | "decrease") => {
    const currentIndex = SIZES.indexOf(size as TileSize);
    let newIndex;

    if (direction === "increase") {
      newIndex =
        currentIndex < SIZES.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    if (newIndex !== currentIndex) {
      await updateTileSize({
        tileId,
        size: SIZES[newIndex],
      });
    }
  };

  return (
    <div className="h-full flex flex-col pr-[12px] relative">
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
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleImageUrlUpdate()
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
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[-1px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => handleSizeChange("increase")}
      >
        <Plus className="" />
      </Button>
      <Button
        variant="ghost"
        className="z-100 rounded-full absolute bottom-[28px] right-[-1px] h-6 w-6 p-0 text-muted"
        onClick={() => handleSizeChange("decrease")}
      >
        <Minus className="" />
      </Button>

      <div className="flex-1 flex items-center justify-center relative">
        {(!imageData || !imageUrl || isImageLoading) && (
          <Loader2 className="animate-spin size-10" />
        )}
      {imageUrl && isDomainAllowed(imageUrl) && (
        <>
          <Image
            src={imageUrl}
            alt="Tile image"
            fill
            className={`
              object-contain transition-opacity duration-300
              ${isImageLoading ? 'opacity-0' : 'opacity-100'}
            `}
            onLoad={handleImageLoad}
            sizes={`(max-width: 768px) 100vw, ${
              size === 'small' ? '200px' : 
              size === 'medium' ? '400px' : '600px'
            }`}
          />
        </>
      )}
      </div>
    </div>
  );
}