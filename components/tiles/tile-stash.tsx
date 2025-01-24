import * as motion from "motion/react-client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { BaseTile } from "@/types";

interface TileStashProps {
  tiles: BaseTile[];
  onRestoreTile: (tileId: Id<"baseTiles">) => void;
}

export default function TileStash({ tiles, onRestoreTile }: TileStashProps) {
  return (
    <motion.div
      className="mt-[45px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-sm font-medium mb-2">Stash</h3>
      <motion.div
        layout
        className="max-h-[250px] grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2"
      >
        {tiles
          .filter((tile) => tile.position < 0)
          .sort((a, b) => b.position - a.position)
          .map((tile, index) => (
            <motion.div
              layout
              layoutId={`removed-tile-${tile._id}`}
              key={tile._id}
              className="flex items-center justify-between border border-zinc-200 dark:border-zinc-900/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
            >
              <div className="h-[25px] border bg-zinc-200/30 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-900/30 rounded-xl flex-grow pl-2 whitespace-nowrap overflow-hidden">
                <span className="text-xs align-middle">{tile.type}</span>
              </div>
              <Button
                variant="ghost"
                className="rounded-full h-6 w-6 p-0"
                onClick={() => onRestoreTile(tile._id)}
              >
                <Plus />
              </Button>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
}
