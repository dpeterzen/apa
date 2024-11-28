"use client"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from 'next/navigation';
import { useConvexAuth } from "convex/react";

export default function WallIdPage({ params }: { params: { wallId: string } }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect('/');
  }

  return (
    <main className="flex flex-1 flex-col gap-3 p-3 pt-1">
      <div className="grid grid-flow-dense grid-cols-6 grid-rows-4 gap-3 h-[900px] ">
        <div className="row-span-3 col-span-6 sm:col-span-3 rounded-xl bg-muted/50">
          Default Note Tile
        </div>
        <div className="aspect-video col-span-6 sm:col-span-3 rounded-xl bg-muted/50">
          Default Video Tile
        </div>
      </div>
    </main>
  );
}
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