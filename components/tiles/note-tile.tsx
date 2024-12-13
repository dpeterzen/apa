import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"

interface NoteTileProps {
  tileId: Id<"baseTiles">
  initialTitle?: string
  initialContent?: string
}

export function NoteTile({ tileId, initialTitle = "", initialContent = "" }: NoteTileProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  return (
    <div className="h-full flex flex-col pr-[12px] relative">
      <Button 
        variant="ghost" 
        className="rounded-tr-xl rounded-tl-none rounded-br-none absolute top-[0px] right-[0px] h-6 w-6 p-0 data-[state=open]:bg-accent"
      >
        <MoreHorizontal className="h-6 w-6" />
      </Button>
      <Input
        placeholder="Start typing..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="font-semibold border-transparent rounded-xl"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 resize-none border-transparent rounded-xl"
      />
    </div>
  )
}