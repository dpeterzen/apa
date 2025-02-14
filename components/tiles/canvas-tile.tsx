import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useEffect, useState, memo } from "react";
import { debounce } from "lodash";
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
import { TileComments } from "./tile-comments";
import "./canvas-tile.css";

const MemoizedTldraw = memo(
  ({
    store,
    isDarkMode,
    onMount,
  }: {
    store: TLStoreWithStatus["store"];
    isDarkMode: boolean;
    onMount: (editor: Editor) => void;
  }) => (
    <Tldraw
      options={{ maxPages: 1 }}
      forceMobile
      store={store}
      inferDarkMode={isDarkMode}
      autoFocus={false}
      onMount={onMount}
    />
  )
);

MemoizedTldraw.displayName = "MemoizedTldraw";

interface CanvasTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function CanvasTile({ tileId, wallId, size }: CanvasTileProps) {
  const editorRef = useRef<Editor | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";
  const themeKey = `tldraw-${isDarkMode ? "dark" : "light"}`;

  const contentCache = useRef<string | null>(null);

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

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };
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

    // Skip if we've already loaded this content or if it matches our cache
    if (
      lastLoadedContentRef.current === newContent ||
      contentCache.current === newContent
    )
      return;

    try {
      if (newContent) {
        const snapshot = JSON.parse(newContent);
        loadSnapshot(storeWithStatus.store, snapshot);
        lastLoadedContentRef.current = newContent;
        contentCache.current = newContent;
      }

      setStoreWithStatus((prev) => ({
        store: prev.store,
        status: "synced-local",
      }));
    } catch (error) {
      console.error("Failed to parse canvas content:", error);
    }
  }, [canvasData]);

  const handleSave = debounce(() => {
    if (storeWithStatus.status === "synced-local") {
      const { document } = getSnapshot(storeWithStatus.store);
      const newContent = JSON.stringify(document);

      // Only save if content has actually changed
      if (newContent !== contentCache.current) {
        contentCache.current = newContent;
        updateCanvasContent({ tileId, content: newContent });
      }
    }
  }, 1000);

  useEffect(() => {
    if (!isFocused) {
      handleSave.cancel();
      return;
    }

    const interval = setInterval(handleSave, 10000);

    return () => {
      clearInterval(interval);
      handleSave.flush();
    };
  }, [isFocused]);

  return (
    <div className="relative h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center relative rounded-xl border border-[hsl(var(--border-3))] dark:border-none bg-inherit dark:bg-[hsl(var(--accent-tile))]">
          <div
            className={`tldraw__editor canvas-tile ${size} p-[1px]`}
            style={{ position: "relative", width: "100%", height: "100%" }}
            onClick={handleContainerClick}
          >
            {storeWithStatus.status === "synced-local" && (
              <MemoizedTldraw
              key={themeKey}
              store={storeWithStatus.store}
              isDarkMode={isDarkMode}
              onMount={(editor) => {
                editorRef.current = editor;
                // Set the default tool to draw
                editor.setCurrentTool('draw');
                editor.sideEffects.registerAfterChangeHandler(
                  "instance",
                  () => {
                    const isFocused = editor.getInstanceState().isFocused;
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
      </div>
      <TileActions
        onSizeChange={handleSizeChange}
        onPositionChange={handlePositionChange}
        onDelete={handleDelete}
        onCommentToggle={handleCommentToggle}
        showComments={showComments}
        size={size}
      />
      <TileComments show={showComments} />
    </div>
  );
}
