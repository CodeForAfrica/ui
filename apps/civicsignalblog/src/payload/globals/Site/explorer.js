import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Explorer = settings({
  slug: "settings-explorer-site",
  label: "Explorer Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Explorer;
