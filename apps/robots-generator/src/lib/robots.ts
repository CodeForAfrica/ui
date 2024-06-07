import { GlobalState } from "@/robots-generator/context/GlobalContext";
import { platforms } from "@/robots-generator/lib/config";

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

export function formatTime(date: Date) {
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  return `${hours < 10 ? "0" + hours : hours}${
    minutes < 10 ? "0" + minutes : minutes
  }`;
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

export async function generateRobots(state: GlobalState) {
  let robots = ``;

  if (state.defaultAccess === "disallowed") {
    robots += `User-agent: *\nDisallow: /\n\n`;
  } else {
    robots += `User-agent: *\nAllow: /\n\n`;
  }

  if (state.crawlDelay && state.crawlDelay > 0) {
    robots += `Crawl-delay: ${state.crawlDelay}\n\n`;
  }

  if (state.cachedDelay && state.cachedDelay > 0) {
    robots += `Cache-delay: ${state.cachedDelay}\n\n`;
  }

  if (state.visitTimeFrom && state.visitTimeTo) {
    robots += `Visit-time: ${formatTime(new Date(state.visitTimeFrom))}-${formatTime(new Date(state.visitTimeTo))}\n\n`;
  }

  if (state.disallowedPaths.length > 0) {
    const validDisallowedPaths = state.disallowedPaths.filter(
      (path) => path.trim() !== "",
    );
    if (validDisallowedPaths.length > 0) {
      robots += `User-agent: *\nDisallow: ${validDisallowedPaths.join(
        "\nDisallow: ",
      )}\n\n`;
    }
  }

  if (state.allowedPaths.length > 0) {
    const validAllowedPaths = state.allowedPaths.filter(
      (path) => path.trim() !== "",
    );
    if (validAllowedPaths.length > 0) {
      robots += `User-agent: *\nAllow: ${validAllowedPaths.join("\nAllow: ")}\n\n`;
    }
  }

  if (state.platform !== "none") {
    const platform = platforms.find((p) => p.name === state.platform);
    if (platform) {
      robots += `User-agent: *\n${platform.code.trim()}\n\n`;
    }
  }

  state.bots.forEach((bot) => {
    if (!bot.allow) {
      robots += `User-agent: ${bot.name}\nDisallow: /\n\n`;
    }
  });

  if (state.sitemaps.length > 0) {
    const validSitemaps = state.sitemaps.filter(
      (sitemap) => sitemap.trim() !== "",
    );
    if (validSitemaps.length > 0) {
      robots += `Sitemap: ${validSitemaps.join("\nSitemap: ")}\n\n`;
    }
  }

  return robots;
}

export const validateRobots = (robots: string) => {
  const regex = /^(User-agent: |Disallow: |Allow: )/gm;
  return regex.test(robots);
};

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

  const individualBots: Robot[] = robots.groups
    .filter((group: any) => !group.agents.includes("*"))
    .filter((group: any) => group.agents.length > 0)
    .flatMap((group: any) =>
      group.agents.map((agent: string) => ({
        name: agent,
        allow: !group.rules.some((rule: any) => rule.rule === "disallow"),
        category: "unknown",
        label: agent,
      })),
    );

  return {
    sitemaps,
    cacheDelay,
    crawlDelay,
    visitTime,
    disallowedPaths,
    allowedPaths,
    bots: individualBots,
  };
};
