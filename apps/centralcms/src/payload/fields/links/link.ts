import { deepmerge } from '@mui/utils'

import { Field } from 'payload'

type LinkType = (options?: {
  disableLabel?: boolean
  defaultValue?: string
  disableLinkTypeSelection?: boolean
  disableOpenInNewTab?: boolean
  overrides?: Record<string, unknown>
}) => Field

const link: LinkType = ({
  disableLabel = false,
  defaultValue = 'internal',
  disableLinkTypeSelection = false,
  disableOpenInNewTab = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    label: false,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          ...(!disableLabel
            ? [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                } as Field,
              ]
            : []),
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              hidden: disableLinkTypeSelection,
            },
            defaultValue,
            options: [
              {
                label: 'Internal link',
                value: 'internal',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'internal',
            type: 'relationship',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'internal',
            },
            label: 'Document to link to',
            maxDepth: 1,
            relationTo: ['RoboshieldPages', 'CodeForAfricaPages'],
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'custom',
            },
            label: 'Custom URL',
            required: true,
          },
        ],
      },
    ],
  }

  let labelFields: any = []

  if (!disableLabel) {
    labelFields.push({
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
    })
  }

  if (!disableOpenInNewTab) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'newTab',
          label: {
            en: 'Open in new tab',
            fr: 'Ouvrir dans un nouvel onglet',
            pt: 'Abrir num novo separador',
          },
          type: 'checkbox',
        },
      ],
    })
  }

  return deepmerge(linkResult, overrides)
}

export default link
