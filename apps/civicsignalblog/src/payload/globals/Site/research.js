import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

import canRead from "#civicsignalblog/payload/access/applications/research";
import { RESEARCH } from "#civicsignalblog/payload/lib/data/common/applications";
import settings from "#civicsignalblog/payload/utils/createGlobalSettings";

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
