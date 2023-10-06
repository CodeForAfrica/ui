import EngagementTab from "./EngagementTab";
import GeneralTab from "./GeneralTab";
import NavigationTab from "./NavigationTab";

const Site = {
  slug: "site",
  label: "Site",
  access: {
    read: () => true,
  },
  admin: {
    group: "Website",
  },
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default Site;
