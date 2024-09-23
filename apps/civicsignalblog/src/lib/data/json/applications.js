export const MAIN = "main";
export const EXPLORER = "explorer";
export const TOPIC_MAPPER = "topic-mapper";
export const SOURCE_MAPPER = "source-manager";
export const RESEARCH = "research";

const applicationLabels = {
  MAIN: "CivicSignal",
  EXPLORER: "Explorer",
  TOPIC_MAPPER: "Topic Mapper",
  SOURCE_MAPPER: "Source Manager",
  RESEARCH: "Research",
};

const applications = Object.entries(applicationLabels).map(([, label]) => ({
  label,
  value: label.toLowerCase().replace(/\s+/g, "_"),
}));

export default applications;
