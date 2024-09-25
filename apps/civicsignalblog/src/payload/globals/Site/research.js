import canRead from "../../access/applications/research";
import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Research = settings({
  slug: "settings-site",
  label: " Site",
  group: "Settings",
  access: {
    read: canRead,
  },
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Research;
