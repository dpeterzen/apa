import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import { NoteEditor } from '../editor/note-editor';

interface NoteTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function NoteTile({ tileId, wallId, size }: NoteTileProps) {
  const { handleSizeChange, handlePositionChange, handleDelete } = useTileActions({
    tileId,
    wallId,
    size,
  });
  const noteData = useQuery(api.noteTiles.getNoteContent, { tileId });
  const updateNote = useMutation(api.noteTiles.updateNoteContent);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // sync state with query data - effects after hooks
  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
    }
  }, [noteData]);

  // callbacks after effects
  const debouncedUpdate = useCallback(
    debounce((newTitle: string, newContent: string) => {
      updateNote({
        tileId,
        title: newTitle,
        content: newContent,
      });
    }, 500),
    [tileId]
  );
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdate(newTitle, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedUpdate(title, newContent);
  };

  // loading check after all hooks
  // if (!noteData) {
  //   return <div className="px-3 py-2">Loading...</div>;
  // }

  return (
    <div className="h-full flex flex-col pr-[22px] relative">
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        size={size}
      >
      </TileActions>
  
      <Input
        placeholder=""
        value={title}
        title={title}
        onChange={handleTitleChange}
        className="font-semibold border-0 rounded-xl bg-zinc-200/30 dark:bg-zinc-900/30 rounded-b-none"
      />
      {/* <NoteEditor
        content={content}
        onChange={(newContent) => {
          setContent(newContent);
          debouncedUpdate(title, newContent);
        }}
      /> */}
      <Textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 resize-none border-0 rounded-xl bg-zinc-200/30 dark:bg-zinc-900/30 rounded-t-none"
      />
    </div>
  );
}
