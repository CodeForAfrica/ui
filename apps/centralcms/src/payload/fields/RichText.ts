import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '@payloadcms/ui'
import { LexicalRichTextAdapterProvider } from 'node_modules/@payloadcms/richtext-lexical/dist/types'
import MediaBlock from '../blocks/codeforafrica/MediaBlock'

interface RichTextInput {
  name: string
  required?: boolean
  label?: string
  defaultValue?: any
  localized?: boolean
}

interface RichTextOutput {
  name: string
  type: 'richText'
  required: boolean
  label: string
  editor: LexicalRichTextAdapterProvider
}

function capitalizeFirstLetter(text: String) {
  return text[0].toUpperCase() + text.slice(1)
}

export default function richText(input: RichTextInput): RichTextOutput {
  return {
    name: input.name,
    type: 'richText',
    required: input.required ?? false,
    label: capitalizeFirstLetter(input.name) ?? 'Content',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
        ]
      },
    }),
  }
}
