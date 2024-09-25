import canRead from "../../access/applications/main";
import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Main = settings({
  slug: "settings-main-site",
  label: "Site",
  group: "Settings",
  access: {
    read: canRead,
  },
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Main;
