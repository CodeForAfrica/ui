import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Sources = createSettings({
  slug: "settings-sources-site",
  label: "Source Manager Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Sources;
