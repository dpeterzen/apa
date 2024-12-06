import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"

interface NoteTileProps {
  wallId: Id<"walls">
  position: { x: number; y: number }
}

export function NoteTile({ wallId, position }: NoteTileProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  
  const createNoteTile = useMutation(api.tiles.create)

  // Auto-save on blur
  const handleBlur = async () => {
    if (!title && !content) return
    
    await createNoteTile({
      wallId,
      type: "note",
      position,
      title,
      content
    })
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        className="mb-2 font-semibold"
      />
      <Textarea
        placeholder="Start typing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        rows={4}
      />
    </div>
  )
}