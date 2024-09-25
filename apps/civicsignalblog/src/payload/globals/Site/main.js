import canRead from "../../access/applications/main";
import { MAIN } from "../../lib/data/common/applications";
import settings from "../../utils/createGlobalSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Main = settings({
  slug: `settings-${MAIN}-site`,
  label: "Site",
  group: "Settings",
  access: {
    read: canRead,
  },
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Main;
