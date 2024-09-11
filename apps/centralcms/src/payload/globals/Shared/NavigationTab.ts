import { Tab } from 'payload'
import link from '@/custom-fields/links/link'
import linkArray from '@/custom-fields/links/linkArray'
import { socialMediaOptions } from '@/custom-fields/socialLinks'

const linkField = link({
  disableOpenInNewTab: false,
})

const NavigationTab: Tab = {
  label: 'Navigation',
  fields: [
    {
      name: 'primaryNavigation',
      type: 'group',
      localized: true,
      fields: [
        {
          type: 'collapsible',
          label: 'Title & Links',
          fields: [
            linkArray({
              overrides: {
                name: 'menus',
                labels: {
                  singular: {
                    en: 'Menu',
                  },
                  plural: {
                    en: 'Menus',
                  },
                },
                fields: [linkField],
                admin: {
                  className: 'array-field-nested',
                },
              },
            }),
            {
              name: 'connect',
              type: 'select',
              options: socialMediaOptions,
            },
          ],
        },
      ],
    },
    {
      name: 'secondaryNavigation',
      type: 'group',
      localized: true,
      fields: [
        {
          type: 'collapsible',
          label: 'Title & Links',
          fields: [
            linkArray({
              overrides: {
                name: 'menus',
                labels: {
                  singular: {
                    en: 'Menu',
                  },
                  plural: {
                    en: 'Menus',
                  },
                },
                fields: [linkField],
                admin: {
                  className: 'array-field-nested',
                },
              },
            }),
          ],
        },
      ],
    },
  ],
}

export default NavigationTab
