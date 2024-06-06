export const formatRobots = (robots: any) => {
  const sitemaps = robots.extensions
    .filter((ext: any) => ext.extension === "sitemap")
    .map((ext: any) => ext.value);

  const cacheDelayExtension = robots.extensions.find(
    (ext: any) => ext.extension === "cache-delay",
  );
  const cacheDelay = cacheDelayExtension ? cacheDelayExtension.value : null;

  const crawlDelayExtension = robots.extensions.find(
    (ext: any) => ext.extension === "crawl-delay",
  );
  const crawlDelay = crawlDelayExtension ? crawlDelayExtension.value : null;

  const visitTimeExtension = robots.extensions.find(
    (ext: any) => ext.extension === "visit-time",
  );
  const visitTime = visitTimeExtension ? visitTimeExtension.value : null;

  const allrobots = robots.groups.find((group: any) =>
    group.agents.includes("*"),
  );

  let disallowedPaths = [];
  if (allrobots) {
    disallowedPaths = allrobots.rules
      .filter((rule: any) => rule.rule === "disallow")
      .map((rule: any) => rule.path);
  }

  let allowedPaths = [];
  if (allrobots) {
    allowedPaths = allrobots.rules
      .filter((rule: any) => rule.rule === "allow")
      .map((rule: any) => rule.path);
  }

  // TODO: improve this to handler individual user agents
  const otherUserAgents = robots.groups
    .filter((group: any) => !group.agents.includes("*"))
    .filter((group: any) => group.agents.length > 0)
    .map((group: any) => {
      return {
        agents: group.agents,
        disallowedPaths: group.rules
          .filter((rule: any) => rule.rule === "disallow")
          .map((rule: any) => rule.path),
        allowedPaths: group.rules
          .filter((rule: any) => rule.rule === "allow")
          .map((rule: any) => rule.path),
      };
    });

  return {
    sitemaps,
    cacheDelay,
    crawlDelay,
    visitTime,
    disallowedPaths,
    allowedPaths,
    bots: otherUserAgents,
  };
};
