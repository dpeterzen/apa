import cn from "classnames";
import { NoteTile } from "./note-tile";
import { ImageTile } from "./image-tile";
import { Id } from "@/convex/_generated/dataModel";
import { Tile } from "@/types";
import * as motion from "motion/react-client";

// xs (<640px): Full width (12 cols)
// sm (≥640px): Various widths
// md (≥768px): More columns
// lg (≥1024px): Most columns
const sizeClasses = {
  small: {
    note: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2",
    video: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-1",
    image: "sm:col-span-4 md:col-span-4 lg:col-span-3 col-span-6 row-span-2 ",
  },
  medium: {
    note: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-4 xl:row-span-4",
    video:
      "col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3 sm:row-span-2 md:row-span-2 lg:row-span-2 2xl:row-span-3",
    image:
      "col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 xl:row-span-4 row-span-3",
  },
  large: {
    note: "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-7 lg:row-span-8 2xl:row-span-9",
    video:
      "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3 sm:row-span-3 md:row-span-4 lg:row-span-4 2xl:row-span-5",
    image:
      "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-7 lg:row-span-7 2xl:row-span-7",
  },
};

export default function ContentTile({ tile }: { tile: Tile }) {
  const renderContent = () => {
    switch (tile.type) {
      case "note":
        return (
          <NoteTile
            tileId={tile.id as Id<"baseTiles">}
            wallId={tile.wallId}
            size={tile.size}
          />
        );
      case "image":
        return (
          <ImageTile
            tileId={tile.id as Id<"baseTiles">}
            wallId={tile.wallId}
            size={tile.size}
          />
        );
      default:
        return <div className="p-4">{tile.content}</div>;
    }
  };

  return (
    <motion.div
      layout
      layoutId={tile.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: {
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 25,
        },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      className={cn(
        "rounded-xl",
        sizeClasses[tile.size][tile.type]
      )}
    >
      <div className="h-full flex flex-col p-0 pb-[30px] relative">
        {renderContent()}
      </div>
    </motion.div>
  );
}
