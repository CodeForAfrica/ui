import canRead from "../../access/applications/sourceManager";
import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Sources = settings({
  slug: "settings-sources-site",
  label: "Site",
  group: "Settings",
  access: {
    read: canRead,
  },
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Sources;
