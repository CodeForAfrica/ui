import { EngagementTab, GeneralTab, NavigationTab, SeoTab } from "./tabs";

import { anyone, hasAdminAccess } from "@/trustlab/payload/access";
import { hideAPIURL } from "@/trustlab/payload/utils";

const SiteSettings = {
  slug: "site-settings",
  label: "Site",
  admin: {
    group: "Settings",
    hideAPIURL,
  },
  access: {
    // Public rendering paths, including the custom error page REST fallback,
    // need navbar/footer/settings data before an authenticated CMS session exists.
    read: anyone,
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
