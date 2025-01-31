'use client';

import './styles.scss';
import { useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 p-2">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-accent' : ''}>
          H3
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'bg-accent' : ''}>
          Paragraph
        </button>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-accent' : ''}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-accent' : ''}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-accent' : ''}>
          Strike
        </button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'bg-accent' : ''}>
          Highlight
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-accent' : ''}>
          Left
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-accent' : ''}>
          Center
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-accent' : ''}>
          Right
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-accent' : ''}
        >
          Bullet List
        </button>
        
        <button 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-accent' : ''}
        >
          Ordered List
        </button>
        
        <button 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-accent' : ''}
        >
          Code Block
        </button>
        
        <button 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-accent' : ''}
        >
          Blockquote
        </button>
        
        <button 
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal Rule
        </button>
        
        <button 
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        
        <button 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
    </div>
  )
}

const Tiptap = ({ initialContent, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
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
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto min-h-0">
        <EditorContent editor={editor} className="h-full" />
      </div>
      {/* <div className="h-4"></div> */}
    </div>
  );
}

export default Tiptap