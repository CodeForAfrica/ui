import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Site = createSettings("settings-site", "Research Site", "Settings", [
  GeneralTab,
  NavigationTab,
  EngagementTab,
]);

export default Site;
