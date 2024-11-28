"use client"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from 'next/navigation';

export default function WallPage() {
  const wall = useQuery(api.walls.getFirstWall);

  // Loading state
  if (wall === undefined) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  // Redirect if wall exists
  if (wall) {
    redirect(`/wall/${wall._id}`);
  }

  // No walls state
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <h1>Welcome! Create your first wall to get started.</h1>
    </main>
  );
}