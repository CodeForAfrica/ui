import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Explorer = createSettings(
  "settings-explorer-site",
  "Explorer Site",
  "Settings",
  [GeneralTab, NavigationTab, EngagementTab],
);

export default Explorer;
