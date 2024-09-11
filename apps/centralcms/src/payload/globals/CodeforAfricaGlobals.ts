import EngagementTab from './Shared/EngagementTab'
import GeneralTab from './Shared/GeneralTab'
import NavigationTab from './Shared/NavigationTab'
import InitiativeTab from './Shared/InitiativeTab'
import { GlobalConfig } from 'payload'
import { canRead } from '@/payload/access/codeforafrica'

const Site: GlobalConfig = {
  slug: 'codeforafrica-site-settings',
  label: 'Site',
  access: {
    read: canRead,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
}

export default Site
