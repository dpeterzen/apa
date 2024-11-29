"use client"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from 'next/navigation';
import { useConvexAuth } from "convex/react";

export default function WallPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const wall = useQuery(api.walls.getFirstWall);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  // If authenticated, handle wall logic
  if (isAuthenticated) {
    // Loading wall data
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

  // Not authenticated, redirect to login
  redirect('/');
}