import EngagementTab from "./EngagementTab";
import GeneralTab from "./GeneralTab";
import NavigationTab from "./NavigationTab";

const Settings = {
  slug: "settings",
  access: {
    read: () => true,
  },
  label: "Settings",
  fields: [
    {
      type: "tabs",
      tabs: [GeneralTab, NavigationTab, EngagementTab],
    },
  ],
};

export default Settings;
