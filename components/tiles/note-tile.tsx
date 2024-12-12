import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"

interface NoteTileProps {
  tileId: Id<"baseTiles">
  initialTitle?: string
  initialContent?: string
}

export function NoteTile({ tileId, initialTitle = "", initialContent = "" }: NoteTileProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  return (
    <div className="p-4 h-full flex flex-col">
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 font-semibold"
      />
      <Textarea
        placeholder="Start typing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 resize-none"
      />
    </div>
  )
}