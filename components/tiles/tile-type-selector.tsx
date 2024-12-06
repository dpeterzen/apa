// components/tiles/tile-type-selector.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TileType = "note" // Add more types later

interface TileTypeSelectorProps {
  value: TileType | undefined
  onValueChange: (value: TileType) => void
}

export function TileTypeSelector({ value, onValueChange }: TileTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select tile type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="note">Note</SelectItem>
      </SelectContent>
    </Select>
  )
}