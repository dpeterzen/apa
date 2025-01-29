'use client';

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import Tiptap from '@/components/tiptap/Tiptap';
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
    const [content, setContent] = useState("<p>Start typing...</p>");
  
    useEffect(() => {
      if (noteData?.content) {
        setContent(noteData.content);
      }
    }, [noteData]);
  
    const debouncedUpdate = useCallback(
      debounce((newContent: string) => {
        updateNote({
          tileId,
          content: newContent,
        });
      }, 500),
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
      <div className="flex-1 min-h-0">
        <Tiptap 
          initialContent={content}
          onUpdate={({ editor }) => {
            const newContent = editor.getHTML();
            setContent(newContent);
            debouncedUpdate(newContent);
          }}
        />
      </div>
    </>
  );
}
