import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

import canRead from "@/civicsignalblog/payload/access/applications/main";
import { MAIN } from "@/civicsignalblog/payload/lib/data/common/applications";
import settings from "@/civicsignalblog/payload/utils/createGlobalSettings";

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
