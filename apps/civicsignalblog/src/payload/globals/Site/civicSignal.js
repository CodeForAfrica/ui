import canRead from "../../access/applications/civicSignal";
import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const CivicSignal = settings({
  slug: "settings-civicsignal-site",
  label: "Site",
  group: "Settings",
  access: {
    read: canRead,
  },
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default CivicSignal;
