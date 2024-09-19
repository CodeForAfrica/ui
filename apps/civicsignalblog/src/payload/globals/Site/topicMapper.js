import settings from "../../fields/settings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const TopicMapper = settings({
  slug: "settings-topic-mapper-site",
  label: "Topic Mapper Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default TopicMapper;
