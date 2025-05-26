import EngagementTab from "./tabs/EngagementTab";
import GeneralTab from "./tabs/GeneralTab";
import NavigationTab from "./tabs/NavigationTab";

import { canManageSiteSettings } from "@/trustlab/payload/access/abilities";
import { anyone } from "@/trustlab/payload/access/anyone";

const SiteSettings = {
  slug: "site-settings",
  label: "Site",
  admin: {
    group: "Settings",
    hideAPIURL: true,
  },
  access: {
    read: anyone,
    update: ({ req: { user } }) => canManageSiteSettings(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default SiteSettings;
