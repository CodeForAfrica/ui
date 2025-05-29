import EngagementTab from "./tabs/EngagementTab";
import GeneralTab from "./tabs/GeneralTab";
import NavigationTab from "./tabs/NavigationTab";

import { loggedIn } from "@/trustlab/payload/access";
import { canManageSiteSettings } from "@/trustlab/payload/access/abilities";
import { hideAPIURL } from "@/trustlab/payload/utils";

const SiteSettings = {
  slug: "site-settings",
  label: "Site",
  admin: {
    group: "Settings",
    hideAPIURL,
  },
  access: {
    // Since we're using Local APIs, we should still be able to pull data server-side
    // See: note in https://payloadcms.com/docs/local-api/overview#transactions
    read: loggedIn,
    update: canManageSiteSettings,
  },
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default SiteSettings;
