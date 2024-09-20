const applications = [
  "Explorer",
  "Topic Mapper",
  "Source Manager",
  "Research Blog",
].map((label) => ({
  label,
  value: label.toLowerCase().replace(/\s+/g, "_"),
}));

export default applications;
