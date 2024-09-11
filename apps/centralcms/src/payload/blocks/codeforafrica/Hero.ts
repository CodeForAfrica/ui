import image from '@/payload/fields/image'
import richText from '@/payload/fields/RichText'
import { Block } from 'payload'

const Hero: Block = {
  slug: 'hero',
  imageURL: '/images/cms/blocks/codeforafrica/hero.jpg',
  imageAltText: 'Used in homepage.',
  fields: [
    richText({
      name: 'title',
      required: true,
    }),
    {
      name: 'messages',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'message',
          type: 'text',
        },
      ],
      admin: {
        className: 'array-field-nested',
        components: {
          RowLabel: '@/payload/components/RowLabel.tsx',
        },
      },
    },
    {
      name: 'subtitle',
      label: 'Description',
      type: 'text',
      required: true,
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
}

export default Hero
