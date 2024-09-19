import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const ResearchBlog = settings({
  slug: "settings-site",
  label: "Research Blog Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default ResearchBlog;
