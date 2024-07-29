function idify(string) {
  return string
    .replace(/^\s+|\s+$/g, "")
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_");
}

export function createFiltersForGroups(groups) {
  // we use a Map here to make it faster to create unique filters
  const filters = new Map();
  const signals = new Map();
  groups.forEach((group) => {
    const { name } = group;
    const keyName = idify(name);
    filters.set(keyName, {
      type: "filter",
      expr: `!${keyName}Filter || (${keyName}Filter && datum["${name}"] === ${keyName}FilterValue)`,
    });
    signals.set(keyName, { name: `${keyName}Filter`, value: false });
    signals.set(`${keyName}Value`, { name: `${keyName}FilterValue` });
  });
  return {
    signals: Array.from(signals.values()),
    filters: Array.from(filters.values()),
  };
}
export default createFiltersForGroups;
