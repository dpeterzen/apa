import { useCallback, useMemo } from 'react'
import { createEditor, Descendant, Editor, Element as SlateElement, Node, Transforms } from 'slate'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import { withHistory } from 'slate-history'
import { CustomEditor, CustomElement, ParagraphElement, TitleElement } from './types'

const withLayout = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1 || Editor.string(editor, [0, 0]) === '') {
        const title: TitleElement = {
          type: 'title',
          children: [{ text: 'Untitled' }],
        }
        Transforms.insertNodes(editor, title, {
          at: path.concat(0),
          select: true,
        })
      }

      if (editor.children.length < 2) {
        const paragraph: ParagraphElement = {
          type: 'paragraph',
          children: [{ text: '' }],
        }
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
      }

      for (const [child, childPath] of Node.children(editor, path)) {
        const slateIndex = childPath[0]
        const type = slateIndex === 0 ? 'title' : 'paragraph'
        
        if (SlateElement.isElement(child) && child.type !== type) {
          Transforms.setNodes(editor, { type }, { at: childPath })
        }
      }
    }
    return normalizeNode([node, path])
  }

  return editor
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch ((element as CustomElement).type) {
    case 'title':
      return <h2 className="text-2xl font-bold mb-2" {...attributes}>{children}</h2>
    case 'paragraph':
      return <p className="mb-1" {...attributes}>{children}</p>
  }
}

interface NoteEditorProps {
  content: string
  onChange: (value: string) => void
}

const initialValue: Descendant[] = [
  {
    type: 'title',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export function NoteEditor({ content, onChange }: NoteEditorProps) {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  )

  const value = content ? JSON.parse(content) : initialValue

  return (
    <Slate 
      editor={editor} 
      initialValue={value}
      onChange={value => onChange(JSON.stringify(value))}
    >
      <Editable
        renderElement={renderElement}
        placeholder="Start writing..."
        spellCheck
        className="flex-1 p-2 focus:outline-none"
      />
    </Slate>
  )
}