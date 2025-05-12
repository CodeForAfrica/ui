import EngagementTab from "./tabs/EngagementTab";
import GeneralTab from "./tabs/GeneralTab";
import NavigationTab from "./tabs/NavigationTab";

const SiteSettings = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default SiteSettings;
