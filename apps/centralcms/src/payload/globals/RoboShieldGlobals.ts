import EngagementTab from './Shared/EngagementTab'
import GeneralTab from './Shared/GeneralTab'
import NavigationTab from './Shared/NavigationTab'
import InitiativeTab from './Shared/InitiativeTab'
import { GlobalConfig } from 'payload'
import { canRead } from '@/payload/access/roboshield'

const Site: GlobalConfig = {
  slug: 'roboshield-site-settings',
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
      tabs: [GeneralTab, NavigationTab, EngagementTab, InitiativeTab],
    },
  ],
}

export default Site
