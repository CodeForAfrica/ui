import { site } from "@/trustlab/utils";

const HOMEPAGE_TITLES = ["home", "homepage", "index"];

// Default SEO is already defined in "@/trustlab/next-seo.config"
// Only generate SEO that changes per page or modifiable via settings.
export function getPageSeoFromMeta(page, settings) {
  const {
    title: pageTitle,
    meta: {
      title: pageMetaTitle,
      description: pageMetaDescription,
      image: pageMetaImage,
    },
  } = page;
  const {
    meta: {
      title: settingsMetaTitle,
      description: settingsMetaDescription,
      image: settingsMetaImage,
    },
  } = settings;
  const siteTitle = settingsMetaTitle?.trim() || site.name;
  const defaultTitle = siteTitle;
  const titleTemplate = `%s | ${siteTitle}`;
  let title = null;
  if (pageMetaTitle || !HOMEPAGE_TITLES.includes(pageTitle?.toLowerCase())) {
    title = (pageMetaTitle || pageTitle).trim() || null;
  }
  const description =
    (pageMetaDescription || settingsMetaDescription)?.trim() || null;
  const canonical = site.url.replace(/\/+$/, "");
  const openGraph = {
    title,
    description,
    type: "website",
    site_name: siteTitle,
  };
  const image = pageMetaImage || settingsMetaImage;
  if (image?.url) {
    const { alt, height, mimeType: type, url, width } = image;
    openGraph.images = [
      {
        alt: alt || title || defaultTitle,
        height,
        type,
        url,
        width,
      },
    ];
  }

  return {
    title,
    titleTemplate,
    defaultTitle,
    description,
    canonical,
    openGraph,
  };
}

const formatRuleSet = (ruleSet) => {
  return {
    userAgent: (ruleSet?.userAgent || "*")
      .split(",")
      .map((agent) => `${agent}`.trim()),
    allow: (ruleSet.allow || "").split(",").map((path) => `${path}`.trim()),
    disallow: (ruleSet.disallow || "")
      .split(",")
      .map((path) => `${path}`.trim()),
    crawlDelay: ruleSet.crawlDelay ?? null,
  };
};

const USER_AGENT_REGEX = /^user-agent$/i;
const ALLOW_REGEX = /^allow$/i;
const DISALLOW_REGEX = /^disallow$/i;
const CRAWL_DELAY_REGEX = /^crawl-delay$/i;
const CACHE_DELAY_REGEX = /^cache-delay$/i;
const VISIT_TIME_REGEX = /^visit-time$/i;

const appendDirectiveValue = (previous, value) => {
  if (previous === undefined || previous === null || previous === "") {
    return value;
  }
  if (Array.isArray(previous)) {
    return [...previous, value];
  }
  return [previous, value];
};

const startRule = (rules, userAgent, meta = {}) => {
  const rule = { userAgent: userAgent || "*", ...meta };
  rules.push(rule);
  return rule;
};

const updateRule = (rule, next) => Object.assign(rule, next);

function parseRobotsToMetadata(content = "") {
  const rules = [];
  let current = null;

  const ensureRule = () => {
    if (!current) {
      current = startRule(rules, "*", { autoUserAgent: true });
    }
    return current;
  };

  content.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      return;
    }

    const [rawKey, rawValue = ""] = line.split(":", 2);
    const key = rawKey.trim();
    const value = rawValue.trim();

    if (USER_AGENT_REGEX.test(key)) {
      if (current && current.autoUserAgent) {
        updateRule(current, { userAgent: value || "*" });
        delete current.autoUserAgent;
      } else {
        current = startRule(rules, value || "*");
      }
      return;
    }

    const rule = ensureRule();

    if (ALLOW_REGEX.test(key)) {
      updateRule(rule, { allow: appendDirectiveValue(rule.allow, value) });
      return;
    }

    if (DISALLOW_REGEX.test(key)) {
      updateRule(rule, {
        disallow: appendDirectiveValue(rule.disallow, value),
      });
      return;
    }

    if (CRAWL_DELAY_REGEX.test(key)) {
      const numeric = Number(value);
      updateRule(rule, {
        crawlDelay: Number.isFinite(numeric) ? numeric : value,
      });
      return;
    }

    if (CACHE_DELAY_REGEX.test(key)) {
      const numeric = Number(value);
      updateRule(rule, {
        cacheDelay: Number.isFinite(numeric) ? numeric : value,
      });
      return;
    }

    if (VISIT_TIME_REGEX.test(key)) {
      updateRule(rule, {
        visitTime: appendDirectiveValue(rule.visitTime, value),
      });
    }
  });

  const sanitizedRules = rules.map((ruleEntry) => {
    const { autoUserAgent, ...cleanRule } = ruleEntry;
    return cleanRule;
  });

  console.log(JSON.stringify(sanitizedRules, null, 2));
  return { rules: sanitizedRules };
}

export function processRobotsTxtContent(robotsTxt) {
  if (robotsTxt?.format === "object") {
    return (
      {
        rules: robotsTxt.objectContent.ruleSet?.map((entry) =>
          formatRuleSet(entry.rule),
        ),
        sitemap: robotsTxt.objectContent.sitemap ?? null,
        host: robotsTxt.objectContent.host ?? null,
      } || []
    );
  }
  return parseRobotsToMetadata(robotsTxt?.textContent || "");
}

export default undefined;
