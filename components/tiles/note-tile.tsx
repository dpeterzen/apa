"use client";

import { useCallback, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import Tiptap from "@/components/tiptap/Tiptap";
import { TileComments } from "./tile-comments";

interface NoteTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function NoteTile({ tileId, wallId, size }: NoteTileProps) {
  const [showComments, setShowComments] = useState(false);
  const { handleSizeChange, handlePositionChange, handleDelete } =
    useTileActions({
      tileId,
      wallId,
      size,
    });
  const noteData = useQuery(api.noteTiles.getNoteContent, { tileId });
  const updateNote = useMutation(api.noteTiles.updateNoteContent);

  const debouncedUpdate = useCallback(
    debounce((newContent: string) => {
      updateNote({
        tileId,
        content: newContent,
      });
    }, 4000),
    [tileId]
  );

  if (!noteData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 min-h-0 rounded-xl border border-[hsl(var(--border-3))] dark:border-transparent P-2">
        <Tiptap
          initialContent={noteData.content || ""}
          placeholder="Write something..."
          onUpdate={({ editor }) => {
            debouncedUpdate(editor.getHTML());
          }}
          showMenu={size !== "small"}
        />
      </div>
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        size={size}
        onCommentToggle={() => setShowComments(!showComments)}
        showComments={showComments}
      />
      <TileComments show={showComments} />
    </div>
  );
}
