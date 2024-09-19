import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Sources = createSettings(
  "settings-sources-site",
  "Source Manager Site",
  "Settings",
  [GeneralTab, NavigationTab, EngagementTab],
);

export default Sources;
