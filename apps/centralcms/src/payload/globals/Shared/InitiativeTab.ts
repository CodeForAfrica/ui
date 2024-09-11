import { CustomComponent, Tab } from 'payload'
import image from '@/custom-fields/image'
import link from '@/custom-fields/links/link'
import richText from '@/custom-fields/RichText'

const PartnersTab: Tab = {
  label: 'Initiative',
  fields: [
    {
      name: 'initiative',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        richText({
          name: 'description',
          required: true,
        }),
        {
          name: 'partners',
          label: 'Partners',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            image({
              overrides: {
                label: 'Logo',
                name: 'logo',
                required: true,
              },
            }),
            link({
              defaultValue: 'custom',
              disableLinkTypeSelection: true,
              disableOpenInNewTab: true,
            }),
          ],
          admin: {
            components: {
              RowLabel: '@/payload/components/RowLabel.tsx',
            },
          },
        },
      ],
    },
  ],
}

export default PartnersTab
