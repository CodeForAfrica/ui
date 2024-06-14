import { GlobalState } from "@/robots-generator/context/GlobalContext";
import {
  configureAllowPaths,
  configureCacheDelay,
  configureCrawlDelay,
  configureDisallowPaths,
  configureSitemaps,
  configureVisitTime,
  configureBot,
} from "@/robots-generator/lib/config";
export interface Robot {
  name: string;
  label: string;
  allow?: boolean;
  rules?: BotRule;
}

export interface BotRule {
  allowedPaths: string[];
  disallowedPaths: string[];
}

export const allowedCategories = ["Search Engine"];

export const robots: Robot[] = [
  {
    name: "exabot",
    label: "Exabot",
    allow: true,
  },
  {
    name: "gpt-bot",
    label: "GPT Bot",
    allow: true,
  },
  {
    name: "googleExtended",
    label: "Google Extended",
    allow: true,
  },
  {
    name: "anthropic-ai",
    label: "Anthropic AI",
    allow: true,
  },
  {
    name: "openai",
    label: "OpenAI",
    allow: true,
  },
  {
    name: "ClaudeBot",
    label: "ClaudeBot",
    allow: true,
  },
];

const mergeAndSortBots = (existingBots: Robot[], newBots: Robot[]) => {
  const updatedBots = existingBots.map((bot) => {
    const newBot = newBots.find((b) => b.name === bot.name);
    return newBot ? newBot : bot;
  });

  const uniqueNewBots = newBots.filter(
    (newBot) => !existingBots.some((bot) => bot.name === newBot.name),
  );

  const mergedBots = [...updatedBots, ...uniqueNewBots];
  return mergedBots.sort((a, b) => a.name.localeCompare(b.name));
};

export async function generateRobots(state: GlobalState) {
  let robots = ``;

  if (state.crawlDelay && state.crawlDelay > 0) {
    robots += configureCrawlDelay(state.crawlDelay);
  }

  if (state.cachedDelay && state.cachedDelay > 0) {
    robots += configureCacheDelay(state.cachedDelay);
  }

  if (state.visitTimeFrom && state.visitTimeTo) {
    robots += configureVisitTime(state.visitTimeFrom, state.visitTimeTo);
  }

  if (state.disallowedPaths.length > 0) {
    const validDisallowedPaths = state.disallowedPaths.filter(
      (path) => path.trim() !== "",
    );
    if (validDisallowedPaths.length > 0) {
      robots += configureDisallowPaths(validDisallowedPaths);
    }
  }

  if (state.allowedPaths.length > 0) {
    const validAllowedPaths = state.allowedPaths.filter(
      (path) => path.trim() !== "",
    );
    if (validAllowedPaths.length > 0) {
      robots += configureAllowPaths(validAllowedPaths);
    }
  }

  state.bots.map((bot) => {
    robots += configureBot(bot);
  });

  if (state.sitemaps.length > 0) {
    const validSitemaps = state.sitemaps.filter(
      (sitemap) => sitemap.trim() !== "",
    );
    if (validSitemaps.length > 0) {
      robots += configureSitemaps(validSitemaps);
    }
  }

  return robots;
}

export const validateRobots = (robots: string) => {
  const regex = /^(User-agent: |Disallow: |Allow: )/gm;
  return regex.test(robots);
};

export const formatRobots = (parsedRobots: any) => {
  const sitemaps = parsedRobots.extensions
    .filter((ext: any) => ext.extension === "sitemap")
    .map((ext: any) => ext.value);

  const cacheDelayExtension = parsedRobots.extensions.find(
    (ext: any) => ext.extension === "cache-delay",
  );
  const cacheDelay = cacheDelayExtension ? cacheDelayExtension.value : null;

  const crawlDelayExtension = parsedRobots.extensions.find(
    (ext: any) => ext.extension === "crawl-delay",
  );
  const crawlDelay = crawlDelayExtension ? crawlDelayExtension.value : null;

  const visitTimeExtension = parsedRobots.extensions.find(
    (ext: any) => ext.extension === "visit-time",
  );
  const visitTime = visitTimeExtension ? visitTimeExtension.value : null;

  const allrobots = parsedRobots.groups.find((group: any) =>
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

  const otherBots: Robot[] = parsedRobots.groups.filter(
    (group: any) => !group.agents.includes("*"),
  );

  const parsedBots = otherBots.flatMap((group: any) => {
    return group.agents.map((agent: string) => ({
      name: agent,
      allow: !group.rules.some(
        (rule: any) => rule.rule === "disallow" && rule.path === "/",
      ),
      label: agent,
      rules: {
        allowedPaths: group.rules
          .filter((rule: any) => rule.rule === "allow")
          .map((rule: any) => rule.path),
        disallowedPaths: group.rules
          .filter((rule: any) => rule.rule === "disallow")
          .map((rule: any) => rule.path),
      },
    }));
  });

  const parsedBotsWithDefaults = mergeAndSortBots(robots, parsedBots);

  return {
    sitemaps,
    cacheDelay,
    crawlDelay,
    visitTime,
    disallowedPaths,
    allowedPaths,
    bots: parsedBotsWithDefaults,
  };
};
