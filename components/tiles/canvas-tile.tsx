import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Tldraw, createTLStore, getSnapshot, loadSnapshot, TLStoreWithStatus } from "tldraw";
import "tldraw/tldraw.css";
import { useTheme } from "next-themes";

interface CanvasTileProps {
  tileId: Id<"baseTiles">;
  wallId: Id<"walls">;
  size: "small" | "medium" | "large";
}

export function CanvasTile({ tileId, wallId, size }: CanvasTileProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const updateCanvasContent = useMutation(api.canvasTiles.updateCanvasContent);
  const canvasData = useQuery(api.canvasTiles.getCanvasContent, { tileId });

  const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
    store: createTLStore(),
    status: 'not-synced',
  });

  useEffect(() => {
    let cancelled = false;

    async function loadRemoteSnapshot() {
      if (canvasData && canvasData.content) {
        try {
          const snapshot = JSON.parse(canvasData.content);
          const newStore = createTLStore();
          loadSnapshot(newStore, snapshot);

          if (!cancelled) {
            setStoreWithStatus({
              store: newStore,
              status: 'synced-local',
            });
          }
        } catch (error) {
          console.error("Failed to parse canvas content:", error);
        }
      } else {
        const newStore = createTLStore();
        if (!cancelled) {
          setStoreWithStatus({
            store: newStore,
            status: 'synced-local',
          });
        }
      }
    }

    loadRemoteSnapshot();

    return () => {
      cancelled = true;
    };
  }, [canvasData]);

  const handleSave = () => {
    if (storeWithStatus.status === 'synced-local') {
      const { document } = getSnapshot(storeWithStatus.store);
      updateCanvasContent({ tileId, content: JSON.stringify(document) });
    }
  };

  useEffect(() => {
    const interval = setInterval(handleSave, 5000); // Save every 5 seconds
    return () => clearInterval(interval);
  }, [storeWithStatus]);

  return (
    <div 
      className={`tldraw__editor canvas-tile ${size}`} 
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {storeWithStatus.status === 'synced-local' && (
        <Tldraw
          store={storeWithStatus.store}
          inferDarkMode 
        />
      )}
    </div>
  );
}
