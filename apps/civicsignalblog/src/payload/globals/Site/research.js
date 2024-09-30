import canRead from "../../access/applications/research";
import { RESEARCH } from "../../lib/data/common/applications";
import settings from "../../utils/createGlobalSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const Research = settings({
  slug: `settings-${RESEARCH}-site`,
  label: " Site",
  group: "Settings",
  access: {
    read: canRead,
  },
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default Research;
