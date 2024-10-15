import EngagementTab from "./EngagementTab";
import GeneralTab from "./GeneralTab";
import NavigationTab from "./NavigationTab";

const Site = {
  slug: "settings-site",
  label: "Site",
  access: {
    read: () => true,
  },
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

export default Site;
