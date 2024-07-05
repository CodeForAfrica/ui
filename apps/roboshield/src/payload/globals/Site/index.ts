import EngagementTab from "./EngagementTab";
import GeneralTab from "./GeneralTab";
import NavigationTab from "./NavigationTab";
import InitiativeTab from "./InitiativeTab";
import { GlobalConfig } from "payload/types";

const Site: GlobalConfig = {
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
