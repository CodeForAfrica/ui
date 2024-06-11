import { Robot } from "./robots";

export const platforms = [
  {
    name: "none",
    label: "None",
    code: "",
  },
  {
    name: "wordpress",
    label: "WordPress",
    code: `Disallow: /wp-admin/\nDisallow: /wp-includes/\nAllow: /wp-admin/admin-ajax.php`,
  },
  {
    name: "squarespace",
    label: "Squarespace",
    code: `Disallow: /api/\nDisallow: /config/`,
  },
  {
    name: "wix",
    label: "Wix",
    code: `Disallow: /_api/\nDisallow: /files/\nDisallow: /site-assets/\nDisallow: /_partials/`,
  },
  {
    name: "weebly",
    label: "Weebly",
    code: `Disallow: /ajax/\nDisallow: /api/`,
  },
  {
    name: "joomla",
    label: "Joomla",
    code: `Disallow: /administrator/\nDisallow: /bin/\nDisallow: /cache/\nDisallow: /cli/\nDisallow: /components/\nDisallow: /includes/\nDisallow: /installation/\nDisallow: /language/\nDisallow: /layouts/\nDisallow: /libraries/\nDisallow: /logs/\nDisallow: /modules/\nDisallow: /plugins/\nDisallow: /tmp/`,
  },
  {
    name: "drupal",
    label: "Drupal",
    code: `Disallow: /core/\nDisallow: /includes/\nDisallow: /misc/\nDisallow: /modules/\nDisallow: /profiles/\nDisallow: /scripts/\nDisallow: /themes/\nDisallow: /update.php\nDisallow: /xmlrpc.php`,
  },
  {
    name: "webflow",
    label: "Webflow",
    code: `Disallow: /api/\nDisallow: /collections/\nDisallow: /editor/`,
  },
];

export const configureCrawlDelay = (delay: number) => {
  const comment =
    "#Crawl-delay Specifies the minimum interval (in seconds)\n#for a robot to wait after loading one page, before starting to load another.\n";
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
  return `${comment}Disallow: ${paths.join("\nDisallow: ")}\n\n`;
};

export const configureAllowPaths = (paths: string[]) => {
  const comment =
    "# Allow specifies the paths that are allowed to be crawled by the robot.\n";
  return `${comment}Allow: ${paths.join("\nAllow: ")}\n\n`;
};

export const configurePlatform = (platform: string) => {
  const selectedPlatform = platforms.find((p) => p.name === platform);
  return selectedPlatform
    ? `# Platform: ${selectedPlatform.label}\n${selectedPlatform.code}\n\n`
    : "";
};

export const configureSitemaps = (sitemaps: string[]) => {
  const comment = "# Sitemap specifies the location of the sitemap.\n";
  return `${comment}Sitemap: ${sitemaps.join("\nSitemap: ")}\n\n`;
};

export const configureBot = (bot: Robot) => {
  let robots = ``;
  if (!bot.allow) {
    robots = `# ${bot.label}\n`;
    robots += `User-agent: ${bot.name}\nDisallow: /\n\n`;
  } else {
    if (bot.rules) {
      robots = `# ${bot.label}\n`;
      if (bot.rules.disallowedPaths.length > 0) {
        const validDisallowedPaths = bot.rules.disallowedPaths.filter(
          (path) => path.trim() !== "",
        );
        if (validDisallowedPaths.length > 0) {
          robots += `User-agent: ${bot.name}\nDisallow: ${validDisallowedPaths.join(
            "\nDisallow: ",
          )}\n\n`;
        }
      }

      if (bot.rules.allowedPaths.length > 0) {
        const validAllowedPaths = bot.rules.allowedPaths.filter(
          (path) => path.trim() !== "",
        );
        if (validAllowedPaths.length > 0) {
          robots += `User-agent: ${bot.name}\nAllow: ${validAllowedPaths.join(
            "\nAllow: ",
          )}\n\n`;
        }
      }
    }
  }

  return robots;
};
