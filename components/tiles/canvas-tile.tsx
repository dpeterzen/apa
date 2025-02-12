import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useEffect, useState } from "react";
import {
  Editor,
  Tldraw,
  createTLStore,
  getSnapshot,
  loadSnapshot,
  TLStoreWithStatus,
} from "tldraw";
import "tldraw/tldraw.css";
import { useTheme } from "next-themes";
import { useTileActions } from "@/hooks/use-tile-actions";
import { TileActions } from "./tile-actions";

interface CanvasTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function CanvasTile({ tileId, wallId, size }: CanvasTileProps) {
  const editorRef = useRef<Editor | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";
  const themeKey = `tldraw-${isDarkMode ? "dark" : "light"}`;

  const updateCanvasContent = useMutation(api.canvasTiles.updateCanvasContent);
  const canvasData = useQuery(api.canvasTiles.getCanvasContent, { tileId });

  // Create store only once
  const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>(
    () => ({
      store: createTLStore(),
      status: "not-synced",
    })
  );

  // Track the last loaded content to prevent unnecessary resets
  const lastLoadedContentRef = useRef<string | null>(null);

  const { handleSizeChange, handlePositionChange, handleDelete } =
    useTileActions({
      tileId,
      wallId,
      size,
    });

  // Add click handler for the container
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      editorRef.current?.blur();
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (!canvasData) return;

    const newContent = canvasData.content;

    // Skip if we've already loaded this content
    if (lastLoadedContentRef.current === newContent) return;

    try {
      if (newContent) {
        const snapshot = JSON.parse(newContent);
        loadSnapshot(storeWithStatus.store, snapshot);
        lastLoadedContentRef.current = newContent;
      }

      setStoreWithStatus((prev) => ({
        store: prev.store,
        status: "synced-local",
      }));
    } catch (error) {
      console.error("Failed to parse canvas content:", error);
      // Keep existing store state on error
      setStoreWithStatus((prev) => ({
        store: prev.store,
        status: "synced-local",
      }));
    }
  }, [canvasData]);

  const handleSave = () => {
    if (storeWithStatus.status === "synced-local") {
      const { document } = getSnapshot(storeWithStatus.store);
      updateCanvasContent({ tileId, content: JSON.stringify(document) });
    }
  };

  // Save when component unmounts if there were changes
  useEffect(() => {
    return () => {
      if (isFocused) {
        handleSave();
      }
    };
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) return;

    const interval = setInterval(handleSave, 5000);
    return () => clearInterval(interval);
  }, [storeWithStatus, isFocused]);

  return (
    <>
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        size={size}
      />
      <div className="flex-1 min-h-0 rounded-xl border dark:border-transparent bg-inherit dark:bg-accent/70 p-[2px]">
        <div
          className={`tldraw__editor canvas-tile ${size} rounded-lg overflow-hidden`}
          style={{ position: "relative", width: "100%", height: "100%" }}
          onClick={handleContainerClick}
        >
          {storeWithStatus.status === "synced-local" && (
            <Tldraw
              key={themeKey}
              store={storeWithStatus.store}
              inferDarkMode={isDarkMode}
              autoFocus={false}
              onMount={(editor) => {
                editorRef.current = editor;
                // Listen for instance state changes which includes focus state
                editor.sideEffects.registerAfterChangeHandler(
                  "instance",
                  () => {
                    const isFocused = editor.getInstanceState().isFocused;
                    console.log("Canvas focus changed:", isFocused);
                    setIsFocused(isFocused);
                    if (!isFocused) {
                      handleSave();
                    }
                  }
                );
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
