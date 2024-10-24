export const MAIN = "tools";
export const EXPLORER = "explorer";
export const TOPIC_MAPPER = "topics";
export const SOURCE_MAPPER = "sources";
export const RESEARCH = "research";

const applicationLabels = {
  [MAIN]: "CivicSignal",
  [EXPLORER]: "Explorer",
  [TOPIC_MAPPER]: "Topic Mapper",
  [SOURCE_MAPPER]: "Source Manager",
  [RESEARCH]: "Research",
};

const applications = Object.entries(applicationLabels).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

// We'll iterate over applicationLabels once we have all the pages defined
export const applicationPages = [`${MAIN}-pages`, `${RESEARCH}-pages`];

export default applications;
