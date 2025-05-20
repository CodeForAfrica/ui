import { canPublish } from "../access/abilities";
import { anyone } from "../access/anyone";

import EngagementTab from "./tabs/EngagementTab";
import GeneralTab from "./tabs/GeneralTab";
import NavigationTab from "./tabs/NavigationTab";

const SiteSettings = {
  slug: "site-settings",
  label: "Site",
  admin: {
    group: "Settings",
    hideAPIURL: true,
  },
  access: {
    read: anyone,
    update: ({ req: { user } }) => canPublish(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default SiteSettings;
