import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { Trash } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";
import { BlockNoteEditor } from "@/components/ui/block-note-editor";

interface NoteTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function NoteTile({ tileId, wallId, size }: NoteTileProps) {
  // group hooks at the top
  const { handleSizeChange, handlePositionChange } = useTileActions({
    tileId,
    wallId,
    size,
  });
  const noteData = useQuery(api.noteTiles.getNoteContent, { tileId });
  const updateNote = useMutation(api.noteTiles.updateNoteContent);
  const deleteTile = useMutation(api.tiles.deleteTile);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // sync state with query data - effects after hooks
  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title);
      // Initialize with empty block if no content
      setContent(noteData.content || JSON.stringify([{
        type: "paragraph",
        content: ""
      }]));
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

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Direct update without debounce for debugging
    updateNote({
      tileId,
      title,
      content: newContent,
    });
  };


  const handleDelete = async () => {
    await deleteTile({
      tileId,
      wallId,
    });
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
        size={size}
      >
        <div
          role="button"
          onClick={handleDelete}
          className="flex items-center px-2 py-1.5 text-sm text-red-600 rounded-md cursor-pointer hover:bg-accent"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </div>
      </TileActions>

      <Input
        placeholder=""
        value={title}
        title={title}
        onChange={handleTitleChange}
        className="font-semibold border-transparent rounded-xl"
      />
      <BlockNoteEditor
        content={content}
        onChange={handleContentChange}
        className="flex-1 rounded-xl"
      />
    </div>
  );
}
