import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type TitleElement = {
  type: 'title'
  children: CustomText[]
}

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CustomElement = TitleElement | ParagraphElement
export type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}