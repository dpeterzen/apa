type TileSize = "small" | "medium" | "large";
type ContentType = "note" | "video" | "image";

interface Tile {
  id: string;
  type: ContentType;
  size: TileSize;
  content: string;
}

// components/ContentTile.tsx
import cn from "classnames";

const MOCK_TILES: Tile[] = [
  {
    id: "1",
    type: "note",
    size: "large",
    content: "Large Note Content",
  },
  {
    id: "2",
    type: "video",
    size: "medium",
    content: "Medium Video Content",
  },
  {
    id: "3",
    type: "image",
    size: "small",
    content: "Small Image Content",
  },
  {
    id: "4",
    type: "note",
    size: "medium",
    content: "Medium Note Content",
  },
  {
    id: "5",
    type: "video",
    size: "large",
    content: "Large Video Content",
  },
];

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
  return (
    <div
      className={cn(
        "rounded-xl border",
        sizeClasses[tile.size][tile.type]
      )}
    >
      {tile.content}
    </div>
  );
}

{ // v1
  /* <main className="flex flex-1 flex-col gap-3 p-3 pt-1">
<div className="grid grid-flow-dense grid-cols-6 grid-rows-4 gap-3 h-[900px] ">
  <div className="row-span-3 col-span-6 sm:col-span-3 rounded-xl bg-muted/50">
    Default Large Note Tile
  </div>
  <div className="aspect-video col-span-6 sm:col-span-3 rounded-xl bg-muted/50">
    Default Large Video Tile
  </div>
  <div className="aspect-square col-span-1 rounded-xl bg-muted/50">
    Default Large Video Tile
  </div>
</div>
</main> */
}

{ // v2
  /* <main className="flex flex-1 flex-col gap-2 p-2 pt-0">
{tiles?.map((tile) => (
  <div key={tile._id} className="p-4 border-b last:border-b-0">
    <div className="font-medium text-white">
      Wall ID: {tile.wallId}
    </div>
    <div className="text-sm text-muted-foreground">
      User ID: {tile.userId}
    </div>
    <div className="text-sm text-muted-foreground">
      Type: {tile.type}
    </div>
    <div className="text-sm text-muted-foreground">
      Created: {new Date(tile.createdAt).toLocaleDateString()}
    </div>
  </div>
))}
</main> */}