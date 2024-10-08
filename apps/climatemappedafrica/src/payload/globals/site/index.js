import EngagementTab from "./EngagementTab";
import GeneralTab from "./GeneralTab";
import InitiativeTab from "./InitiativeTab";
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
      tabs: [GeneralTab, NavigationTab, EngagementTab, InitiativeTab],
    },
  ],
};

export default Site;
