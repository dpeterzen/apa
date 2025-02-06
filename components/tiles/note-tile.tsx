"use client";

import { useCallback } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import Tiptap from "@/components/tiptap/Tiptap";
// import { NoteEditor } from '../editor/note-editor';

interface NoteTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function NoteTile({ tileId, wallId, size }: NoteTileProps) {
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
    <>
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        size={size}
      />
      <div className="flex-1 min-h-0 rounded-xl border dark:border-transparent shadow-sm dark:shadow-none">
        <Tiptap
          initialContent={noteData.content || ""}
          placeholder="Write something..."
          onUpdate={({ editor }) => {
            debouncedUpdate(editor.getHTML());
          }}
          showMenu={size !== "small"}
        />
      </div>
    </>
  );
}
