"use client";

import "./styles.scss";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  MessageSquareQuote,
  Minus,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap pl-1 pt-1 pb-1 pr-5 border-b">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Heading1 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Heading2 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Heading3 />
      </Button>
      {/* <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset" : ""}
        variant="ghost1"
        size="xs"
      >
        Paragraph
      </Button> */}
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset bg-accent/20 dark:hover:bg-accent/70"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Bold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset bg-accent/20 dahover:rk:bg-accent/70"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Italic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset bg-accent/20 dahover:rk:bg-accent/70"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Strikethrough />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={
          editor.isActive("highlight")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Highlighter />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" })
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <AlignLeft />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" })
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <AlignCenter />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" })
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <AlignRight />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <List />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <ListOrdered />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <Code />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "ring-1 ring-[hsl(var(--accent-1))] ring-inset"
            : ""
        }
        variant="ghost1"
        size="xs"
      >
        <MessageSquareQuote />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="ghost1"
        size="xs"
      >
        <Minus />
      </Button>
      <div className="undo-redo-container">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant="ghost1"
          size="xs"
        >
          <Undo2 />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant="ghost1"
          size="xs"
        >
          <Redo2 />
        </Button>
      </div>
    </div>
  );
};

const Tiptap = ({ initialContent, onUpdate, showMenu = true, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onUpdate({ editor });
    },
    enableRichTextPaste: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className="flex flex-col h-full rounded-lg bg-inherit dark:bg-accent/70 overflow-hidden">
      {showMenu && <MenuBar editor={editor} />}
      <div className="flex-1 overflow-y-auto min-h-0 mt-[20px]">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};

export default Tiptap;
