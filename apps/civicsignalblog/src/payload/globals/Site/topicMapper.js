import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const TopicMapper = createSettings({
  slug: "settings-topic-mapper-site",
  label: "Topic Mapper Site",
  group: "Settings",
  tabs: [GeneralTab, NavigationTab, EngagementTab],
});

export default TopicMapper;
