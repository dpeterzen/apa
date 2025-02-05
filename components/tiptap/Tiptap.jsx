"use client";

import "./styles.scss";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from '@tiptap/extension-placeholder'
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
    <div className="flex flex-wrap pt-1 pb-1 pr-5 border-b">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Heading1 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Heading2 />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Heading3 />
      </Button>
      {/* <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        Paragraph
      </Button> */}
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Bold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Italic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Strikethrough />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Highlighter />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <AlignLeft />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <AlignCenter />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <AlignRight />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <List />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <ListOrdered />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <Code />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-accent" : ""}
        variant="ghost"
        size="xs"
      >
        <MessageSquareQuote />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="ghost"
        size="xs"
      >
        <Minus />
      </Button>
      <div className="undo-redo-container">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant="ghost"
          size="xs"
        >
          <Undo2 />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant="ghost"
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
    <div className="flex flex-col h-full rounded-md bg-accent/20 dark:bg-accent/70 overflow-hidden">
      {showMenu && <MenuBar editor={editor} />}
      <div className="flex-1 overflow-y-auto min-h-0 mt-[20px]">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};

export default Tiptap;
