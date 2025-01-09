import { Button } from "@/components/ui/button";
import { AddTilePlus } from "@/components/icons/add-tile-plus";
import { AddTileSquarePlus } from "@/components/icons/add-tile-square-plus";

interface AddTileButtonProps {
  onClick: () => void;
}

export function AddTileButton({ onClick }: AddTileButtonProps) {
  return (
    <Button
      className="mt-1 pl-[6px] group justify-start items-center hover:bg-transparent rounded-none [&_svg]:size-[20px]"
      variant="ghost"
      onClick={onClick}
    >
      <span className="flex items-center">
        <span className="relative flex items-center justify-center mb-[3px] mr-[3px]">
          <AddTilePlus className="group-hover:hidden" />
          <AddTileSquarePlus className="hidden group-hover:block" />
        </span>
        <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-blue-600 ml-2">
          Add tile
        </span>
      </span>
    </Button>
  );
}
