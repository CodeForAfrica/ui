import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Sources = settings({
  slug: "settings-sources-site",
  label: "Source Manager Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Sources;
