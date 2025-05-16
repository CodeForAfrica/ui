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
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default SiteSettings;
