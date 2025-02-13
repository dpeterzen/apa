import { Id } from "@/convex/_generated/dataModel";
import { Link, Loader2, SquarePlay } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import { Button } from "../ui/button";
import { TileComments } from "./tile-comments";

interface VideoTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function VideoTile({ tileId, wallId, size }: VideoTileProps) {
  const { handleSizeChange, handlePositionChange, handleDelete } =
    useTileActions({
      tileId,
      wallId,
      size,
    });

  const updateVideoUrl = useMutation(api.videoTiles.updateVideoUrl);
  const videoData = useQuery(api.videoTiles.getVideoData, { tileId });

  const isInitialLoading = videoData === undefined;

  const [showUrlPopover, setShowUrlPopover] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (videoData) {
      setVideoUrl(videoData.url || "");
    }
  }, [videoData]);

  const handleVideoUrlUpdate = async () => {
    setIsLoading(true);
    try {
      await updateVideoUrl({
        tileId,
        url: videoUrl,
      });
      setShowUrlPopover(false);
    } catch (error) {
      console.error("Error updating video URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmbedUrl = (videoId: string) => {
    const params = new URLSearchParams({
      enablejsapi: "1",
      origin: window.location.origin,
      rel: "0",
      modestbranding: "1",
      playsinline: "1", // Better mobile experience
      autoplay: "0", // Prevent autoplay
      fs: "1", // Enable fullscreen
      controls: "1", // Show controls
      disablekb: "0", // Enable keyboard controls
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <div className="relative h-full">
      <div className="flex flex-col h-full">

      <div
        className={`flex-1 flex items-center justify-center relative rounded-xl dark:border-none ${videoData?.videoId ? "border-none" : "border border-[hsl(var(--border-3))]"}  bg-inherit dark:bg-accent/70`}
      >
        {!videoData?.videoId && !isLoading && !isInitialLoading && (
          <Button
            variant="ghost1"
            size="lgIcon"
            className="flex items-center justify-center [&_svg]:size-10 text-muted-foreground hover:!text-accent-foreground"
          >
            <SquarePlay className="size-10" />
          </Button>
        )}

        {(isLoading || isInitialLoading) && (
          <div className="flex items-center justify-center absolute inset-0 bg-background/50">
            <Loader2 className="animate-spin size-10" />
          </div>
        )}

        {videoData?.videoId && (
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <iframe
                src={getEmbedUrl(videoData.videoId)}
                className="w-full h-full rounded-xl"
                style={{
                  aspectRatio: "16/9",
                  border: "none", // Remove default iframe border
                }}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player" // Add title for accessibility
              />
            </div>
          </div>
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
              className="flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-accent/40 dark:hover:bg-accent/20"
            >
              <Link className="mr-2 h-4 w-4" />
              Video link
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="max-w-[90vw] w-80 rounded-lg p-1"
            align="center"
          >
            <div className="flex flex-col gap-2">
              <Input
                className="h-7 border-0 p-[2px] min-w-0 w-full"
                placeholder="Enter YouTube URL..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleVideoUrlUpdate();
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
