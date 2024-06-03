import { GlobalState } from "@/robots-generator/context/GlobalContext";
import { platforms } from "@/robots-generator/lib/config";

function formatTime(date: Date) {
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  return `${hours < 10 ? "0" + hours : hours}${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}

export const allowedCategories = ["Search Engine"];
export interface Robot {
  name: string;
  label: string;
  category: string;
}
export const robots: Robot[] = [
  {
    name: "googlebot",
    label: "Googlebot",
    category: "Search Engine",
  },
  {
    name: "bingbot",
    label: "Bingbot",
    category: "Search Engine",
  },
  {
    name: "yandexbot",
    label: "Yandexbot",
    category: "Search Engine",
  },
  {
    name: "baiduspider",
    label: "Baiduspider",
    category: "Search Engine",
  },
  {
    name: "duckduckbot",
    label: "DuckDuckBot",
    category: "Search Engine",
  },
  {
    name: "sogou",
    label: "Sogou Spider",
    category: "Search Engine",
  },
  {
    name: "exabot",
    label: "Exabot",
    category: "Search Engine",
  },
  {
    name: "gpt-bot",
    label: "GPT Bot",
    category: "AI Bot",
  },
  {
    name: "googleExtended",
    label: "Google Extended",
    category: "AI Bot",
  },
  {
    name: "anthropic-ai",
    label: "Anthropic AI",
    category: "AI Bot",
  },
  {
    name: "openai",
    label: "OpenAI",
    category: "AI Bot",
  },
  {
    name: "ClaudeBot",
    label: "ClaudeBot",
    category: "AI Bot",
  },
];

export const categorisedRobots = robots.reduce(
  (acc: { [key: string]: any[] }, robot) => {
    if (!acc[robot.category]) {
      acc[robot.category] = [];
    }
    acc[robot.category].push(robot);
    return acc;
  },
  {},
);

export async function generateRobots(state: GlobalState) {
  let robots = ``;

  if (state.defaultAccess === "disallowed") {
    robots += `User-agent: *\nDisallow: /\n\n`;
  } else {
    robots += `User-agent: *\nAllow: /\n\n`;
  }

  if (state.crawlDelay > 0) {
    robots += `Crawl-delay: ${state.crawlDelay}\n\n`;
  }

  if (state.cachedDelay > 0) {
    robots += `Cache-delay: ${state.cachedDelay}\n\n`;
  }

  if (state.visitTime) {
    robots += `Visit-time: ${formatTime(new Date(state.visitTime))}\n\n`;
  }

  if (state.sitemaps.length > 0) {
    robots += `Sitemap: ${state.sitemaps.join("\nSitemap: ")}\n\n`;
  }

  if (state.disallowedPaths.length > 0) {
    robots += `User-agent: *\nDisallow: ${state.disallowedPaths.join(
      "\nDisallow: ",
    )}
    \n\n`;
  }

  if (state.platform !== "none") {
    const platform = platforms.find((p) => p.name === state.platform);
    if (platform) {
      robots += `User-agent: *\n${platform.code.trim()}\n\n`;
    }
  }

  state.bots.forEach((bot) => {
    if (bot.allow) {
      robots += `User-agent: ${bot.robot.name}\nAllow: /\n\n`;
    } else {
      robots += `User-agent: ${bot.robot.name}\nDisallow: /\n\n`;
    }
  });

  return robots;
}
