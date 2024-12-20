"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { debounce } from "lodash";


interface BlockNoteEditorProps {
  onChange: (value: string) => void;
  content: string;
  editable?: boolean;
  className?: string;
}

const defaultContent = [{ type: "paragraph", content: [] }];

export function BlockNoteEditor({ 
  onChange,
  content,
  editable = true,
  className 
}: BlockNoteEditorProps) {
  const [localContent, setLocalContent] = useState(content);
  const { resolvedTheme } = useTheme();
  const lastContent = useRef(content);
  const isFirstMount = useRef(true);


  const parsedContent = useMemo(() => {
    try {
      if (!content) return defaultContent;
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : defaultContent;
    } catch (e) {
      console.warn('Invalid content format, using default', e);
      return defaultContent;
    }
  }, [content]);

  const editor = useCreateBlockNote({
    initialContent: parsedContent,
  });
  

  // Sync editor content with external changes
  useEffect(() => {
    if (!isFirstMount.current && content !== lastContent.current) {
      editor.replaceBlocks(editor.document, parsedContent);
      lastContent.current = content;
      setLocalContent(content);
    }
    isFirstMount.current = false;
  }, [content, editor, parsedContent]);

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      if (value !== content) {
        onChange(value);
      }
    }, 1000),
    [onChange, content]
  );


  return (
    <BlockNoteView
      className={className}
      editable={editable}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        const newContent = JSON.stringify(editor.document);
        setLocalContent(newContent);
        lastContent.current = newContent;
        debouncedOnChange(newContent);
      }}
    />
  );
}