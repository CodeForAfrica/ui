import { Robot } from "./robots-data";

interface Platform {
  name: string;
  label: string;
  allowedPaths: string[];
  disallowedPaths: string[];
}

export const platforms: Platform[] = [
  {
    name: "none",
    label: "Custom",
    allowedPaths: [],
    disallowedPaths: ["/"],
  },
  {
    name: "wordpress",
    label: "WordPress",
    allowedPaths: ["/wp-admin/admin-ajax.php"],
    disallowedPaths: ["/wp-admin/", "/wp-includes/"],
  },
  {
    name: "squarespace",
    label: "Squarespace",
    allowedPaths: [],
    disallowedPaths: ["/api/", "/config/"],
  },
  {
    name: "wix",
    label: "Wix",
    allowedPaths: [],
    disallowedPaths: ["/_api/", "/files/", "/site-assets/", "/_partials/"],
  },
  {
    name: "weebly",
    label: "Weebly",
    allowedPaths: [],
    disallowedPaths: ["/ajax/", "/api/"],
  },
  {
    name: "joomla",
    label: "Joomla",
    allowedPaths: [],
    disallowedPaths: [
      "/administrator/",
      "/bin/",
      "/cache/",
      "/cli/",
      "/components/",
      "/includes/",
      "/installation/",
      "/language/",
      "/layouts/",
      "/libraries/",
      "/logs/",
      "/modules/",
      "/plugins/",
      "/tmp/",
    ],
  },
  {
    name: "drupal",
    label: "Drupal",
    allowedPaths: [],
    disallowedPaths: [
      "/core/",
      "/includes/",
      "/misc/",
      "/modules/",
      "/profiles/",
      "/scripts/",
      "/themes/",
      "/update.php",
      "/xmlrpc.php",
    ],
  },
  {
    name: "webflow",
    label: "Webflow",
    allowedPaths: [],
    disallowedPaths: ["/api/", "/collections/", "/editor/"],
  },
];

export const configureCrawlDelay = (delay: number) => {
  const comment =
    "# Crawl-delay Specifies the minimum interval (in seconds)\n#for a robot to wait after loading one page, before starting to load another.\n";
  return `${comment}Crawl-delay: ${delay}\n\n`;
};

export const configureCacheDelay = (delay: number) => {
  const comment =
    "# Cache-delay specifies the minimum interval (in seconds)\n#for a robot to wait after caching one page, before starting to cache another.\n";
  return `${comment}Cache-delay: ${delay}\n\n`;
};

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const configureVisitTime = (from: Date, to: Date) => {
  const comment =
    "# Visit-time specifies the time of day when a robot is allowed to visit the site.\n";
  return `${comment}Visit-time: ${formatTime(from)}-${formatTime(to)}\n\n`;
};

export const configureDisallowPaths = (paths: string[]) => {
  const comment =
    "# Disallow specifies the paths that are not allowed to be crawled by the robot.\n";
  return `${comment}User-agent: *\nDisallow: ${paths.join("\nDisallow: ")}\n\n`;
};

export const configureAllowPaths = (paths: string[]) => {
  const comment =
    "# Allow specifies the paths that are allowed to be crawled by the robot.\n";
  return `${comment}Allow: ${paths.join("\nAllow: ")}\n\n`;
};

export const configureSitemaps = (sitemaps: string[]) => {
  const comment = "# Sitemap specifies the location of the sitemap.\n";
  return `${comment}Sitemap: ${sitemaps.join("\nSitemap: ")}\n\n`;
};

export const configureBot = (bot: Robot) => {
  let robots = ``;
  if (!bot.allow) {
    robots = `# ${bot.name}\n`;
    robots += `User-agent: ${bot.userAgent}\nDisallow: /\n\n`;
  } else {
    if (bot.rules) {
      robots = `# ${bot.name}\n`;
      if (bot.rules.disallowedPaths.length > 0) {
        const validDisallowedPaths = bot.rules.disallowedPaths.filter(
          (path) => path.trim() !== "",
        );
        if (validDisallowedPaths.length > 0) {
          robots += `User-agent: ${
            bot.userAgent
          }\nDisallow: ${validDisallowedPaths.join("\nDisallow: ")}\n\n`;
        }
      }

      if (bot.rules.allowedPaths.length > 0) {
        const validAllowedPaths = bot.rules.allowedPaths.filter(
          (path) => path.trim() !== "",
        );
        if (validAllowedPaths.length > 0) {
          robots += `User-agent: ${
            bot.userAgent
          }\nAllow: ${validAllowedPaths.join("\nAllow: ")}\n\n`;
        }
      }
    }
  }

  return robots;
};
