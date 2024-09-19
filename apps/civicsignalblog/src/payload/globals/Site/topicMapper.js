import createSettings from "../CreateSettings";

import EngagementTab from "./Components/EngagementTab";
import GeneralTab from "./Components/GeneralTab";
import NavigationTab from "./Components/NavigationTab";

const TopicMapper = createSettings(
  "settings-topic-mapper-site",
  "Topic Mapper Site",
  "Settings",
  [GeneralTab, NavigationTab, EngagementTab],
);

export default TopicMapper;
