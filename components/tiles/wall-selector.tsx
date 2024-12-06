import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface WallSelectorProps {
  value: Id<"walls"> | undefined;
  onValueChange: (value: Id<"walls">) => void;
}

export function WallSelector({ value, onValueChange }: WallSelectorProps) {
  const walls = useQuery(api.walls.list);

  if (walls === undefined) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (walls.length === 0) {
    return <div className="text-sm text-muted-foreground">No walls found. Create one first.</div>;
  }

  return (
    <Select value={value?.toString()} onValueChange={(val) => onValueChange(val as Id<"walls">)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a wall" />
      </SelectTrigger>
      <SelectContent>
        {walls.map((wall) => (
          <SelectItem key={wall._id} value={wall._id}>
            {wall.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}