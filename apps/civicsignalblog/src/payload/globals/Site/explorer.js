import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Explorer = createSettings({
  slug: "settings-explorer-site",
  label: "Explorer Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Explorer;
