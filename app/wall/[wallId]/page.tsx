"use client"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from 'next/navigation';
import { useConvexAuth } from "convex/react";
import React from 'react';


type TileSize = 'small' | 'medium' | 'large';
type ContentType = 'note' | 'video' | 'image';

interface Tile {
  id: string;
  type: ContentType;
  size: TileSize;
  content: string;
}

// components/ContentTile.tsx
import cn from 'classnames';

const MOCK_TILES: Tile[] = [
  {
    id: '1',
    type: 'note',
    size: 'large',
    content: 'Large Note Content'
  },
  {
    id: '2',
    type: 'video',
    size: 'medium',
    content: 'Medium Video Content'
  },
  {
    id: '3', 
    type: 'image',
    size: 'small',
    content: 'Small Image Content'
  },
  {
    id: '4',
    type: 'note',
    size: 'medium',
    content: 'Medium Note Content'
  },
  {
    id: '5',
    type: 'video',
    size: 'large',
    content: 'Large Video Content'
  }
];

// xs (<640px): Full width (12 cols)
// sm (≥640px): Various widths
// md (≥768px): More columns
// lg (≥1024px): Most columns
const sizeClasses = {
  small: {
    note: 'col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2',
    video: 'col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-1',
    image: 'col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-2 row-span-1'
  },
  medium: {
    note: 'col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3',
    video: 'col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-2',
    image: 'col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 row-span-2'
  },
  large: {
    note: 'col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-6 lg:row-span-7',
    video: 'col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 row-span-3 sm:row-span-3 md:row-span-4 lg:row-span-4 2xl:row-span-5',
    image: 'col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 row-span-3'
  }
};



function ContentTile({ tile }: { tile: Tile }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-muted/50',
        sizeClasses[tile.size][tile.type]
      )}
    >
      {tile.content}
    </div>
  );
}

export default function WallIdPage({ params }: { params: Promise<{ wallId: string }> }) {
  const resolvedParams = React.use(params);
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  const [tiles, setTiles] = React.useState<Tile[]>(MOCK_TILES);

  // Not authenticated, redirect immediately
  if (!isLoading && !isAuthenticated) {
    redirect('/');
  }

  // Query only if authenticated
  const hasAccess = useQuery(api.walls.checkWallAccess, 
    isAuthenticated ? { wallId: resolvedParams.wallId } : "skip"
  );

  // Show loading state
  if (isLoading || (isAuthenticated && hasAccess === undefined)) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  // Invalid wall ID or no access
  if (!hasAccess) {
    redirect('/wall'); // Redirect to wall list
  }


  // User has access, render wall content
  return (
    <main className="flex flex-1 flex-col gap-3 p-3 pt-1">
      <div className="grid grid-cols-12 auto-rows-[100px] gap-3">
        {tiles.map(tile => (
          <ContentTile key={tile.id} tile={tile} />
        ))}
      </div>
    </main>
  );
}



{/* <main className="flex flex-1 flex-col gap-3 p-3 pt-1">
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
</main> */}


// <main className="flex flex-1 flex-col gap-3 p-3 pt-1">

//   <div className="grid grid-flow-dense grid-cols-6 grid-rows-4 gap-3 h-[900px] ">
//     <div className="row-span-3 col-span-6 sm:col-span-3 rounded-xl bg-muted/50">Default Note Tile</div>
//     <div className="aspect-video col-span-6 sm:col-span-3 rounded-xl bg-muted/50">Default Video Tile</div>
//     {/* <div className=" rounded-xl bg-muted/50">03</div>
//     <div className=" rounded-xl bg-muted/50">04</div>
//     <div className=" rounded-xl bg-muted/50">05</div> */}
//     </div>



//   {/* <div className="grid grid-flow-col grid-cols-3 gap-2">
//     <div className="aspect-video rounded-xl bg-muted/50">01</div>
//     <div className="aspect-video rounded-xl bg-muted/50">02</div>
//     <div className="aspect-video rounded-xl bg-muted/50">03</div>
//   </div> */}
// </main>

// <main className="flex flex-1 flex-col gap-3 p-3 pt-1">

//   <div className="grid grid-cols-4 grid-rows-6 gap-2 h-full ">
//       <div className="col-span-2 row-span-6 rounded-xl bg-muted/50">1</div>
//       <div className="row-span-2 col-start-3 rounded-xl bg-muted/50">2</div>
//       <div className="row-span-2 col-start-4 rounded-xl bg-muted/50">3</div>
//       <div className="row-span-2 col-start-4 rounded-xl bg-muted/50">4</div>
//   </div>

//   <div className="grid grid-cols-4 grid-rows-6 gap-2 h-full ">
//       <div className="col-span-2 row-span-6 rounded-xl bg-muted/50">1</div>
//       <div className="row-span-2 col-start-3 rounded-xl bg-muted/50">2</div>
//       <div className="row-span-2 col-start-4 rounded-xl bg-muted/50">3</div>
//       <div className="row-span-2 col-start-4 rounded-xl bg-muted/50">4</div>
//   </div>

// </main>

// <main className="flex flex-1 flex-col gap-3 p-3 pt-1">
// <div className="grid auto-rows-min gap-3 md:grid-cols-3">

//   <div className="aspect-video rounded-xl bg-muted/50">
//     <div className="flex flex-col justify-between">

//     </div>
//   </div>
//   <div className="aspect-video rounded-xl bg-muted/50" />
//   <div className="aspect-video rounded-xl bg-muted/50" />
// </div>
// <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
// </main>