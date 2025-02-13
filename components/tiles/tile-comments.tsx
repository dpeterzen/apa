interface TileCommentsProps {
  show: boolean;
}

export function TileComments({ show }: TileCommentsProps) {
  if (!show) return null;

  return (
    <div className="h-32 absolute left-0 right-0 top-full translate-y-[37px] p-2 pt-[2px] rounded-xl z-[51] bg-zinc-200 dark:bg-[hsl(var(--accent))] border border-transparent dark:border-transparent shadow-lg">
      <div className="mt-2 text-sm">
        Comments go here
      </div>
    </div>
  );
}
