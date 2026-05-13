import { EngagementTab, GeneralTab, NavigationTab, SeoTab } from "./tabs";

import {
  hasLoggedInAccess,
  hasAdminAccess,
} from "@/trustlab/payload/access/abilities";
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
    read: hasLoggedInAccess,
    update: hasAdminAccess,
  },
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab, SeoTab],
    },
  ],
};

export default SiteSettings;
