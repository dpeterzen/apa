import cn from "classnames";
import { NoteTile } from "./note-tile";
import { Id } from "@/convex/_generated/dataModel";

type TileSize = "small" | "medium" | "large";
type TileType = "note" | "video" | "image";

interface Tile {
  id: string;
  type: TileType;
  size: TileSize;
  content: string;
  wallId: Id<"walls">; // Add wallId to interface
}

// xs (<640px): Full width (12 cols)
// sm (≥640px): Various widths
// md (≥768px): More columns
// lg (≥1024px): Most columns
const sizeClasses = {
  small: {
    note: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2",
    video: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-1",
    image: "sm:col-span-4 md:col-span-4 lg:col-span-2 col-span-6 row-span-2 ",
  },
  medium: {
    note: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3",
    video:
      "col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3 sm:row-span-2 md:row-span-2 lg:row-span-2 2xl:row-span-3",
    image: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2",
  },
  large: {
    note: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-7 lg:row-span-9 2xl:row-span-10",
    video:
      "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3 sm:row-span-3 md:row-span-4 lg:row-span-4 2xl:row-span-5",
    image: "col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3",
  },
};

export default function ContentTile({ tile }: { tile: Tile }) {
  const renderContent = () => {
    switch (tile.type) {
      case "note":
        return <NoteTile 
          tileId={tile.id as Id<"baseTiles">}
          wallId={tile.wallId}
          size={tile.size}
        />;
      default:
        return <div className="p-4">{tile.content}</div>
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border",
        sizeClasses[tile.size][tile.type]
      )}
    >
      {renderContent()}
    </div>
  );
}