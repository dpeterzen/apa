interface TileCommentsProps {
  show: boolean;
}

export function TileComments({ show }: TileCommentsProps) {
  if (!show) return null;

  return (
    <div className="h-32 absolute left-0 right-0 top-full translate-y-[5px] p-2 pt-[2px] rounded-xl z-[51] bg-background dark:bg-accent border border-[hsl(var(--border-3))] dark:border-transparent shadow-lg">
      <div className="ml-6 text-sm">
        Comments go here
      </div>
    </div>
  );
}
