const USER_AGENT_REGEX = /^user-agent$/i;
const ALLOW_REGEX = /^allow$/i;
const DISALLOW_REGEX = /^disallow$/i;
const CRAWL_DELAY_REGEX = /^crawl-delay$/i;
const CACHE_DELAY_REGEX = /^cache-delay$/i;
const VISIT_TIME_REGEX = /^visit-time$/i;
const SITEMAP_REGEX = /^sitemap$/i;
const HOST_REGEX = /^host$/i;
const CLEAN_PARAM_REGEX = /^clean-param$/i;

const KNOWN_DIRECTIVES = new Set([
  "user-agent",
  "allow",
  "disallow",
  "crawl-delay",
  "cache-delay",
  "visit-time",
  "sitemap",
  "host",
  "clean-param",
]);

const normalizeString = (value) =>
  typeof value === "string" ? value : `${value ?? ""}`;

const appendDirectiveValue = (previous, value) => {
  if (previous === undefined || previous === null || previous === "") {
    return value;
  }
  if (Array.isArray(previous)) {
    return [...previous, value];
  }
  return [previous, value];
};

const appendUserAgent = (previous, value) => {
  const normalized = value || "*";
  if (!previous || previous === "") {
    return normalized;
  }
  if (Array.isArray(previous)) {
    return [...previous, normalized];
  }
  if (previous === normalized) {
    return previous;
  }
  return [previous, normalized];
};

const startRule = (rules, userAgent, meta = {}) => {
  const rule = { userAgent: userAgent || "*", ...meta };
  rules.push(rule);
  return rule;
};

const updateRule = (rule, next) => Object.assign(rule, next);

export default function parseRobotsToMetadata(rawContent = "", options = {}) {
  const { collectDiagnostics = false } = options;
  const diagnostics = collectDiagnostics ? [] : undefined;
  const content = normalizeString(rawContent);
  const rules = [];
  const sitemap = [];
  const cleanParams = [];
  let host = null;
  let current = null;
  let currentHasDirectives = false;

  const ensureRule = () => {
    if (!current) {
      current = startRule(rules, "*", { autoUserAgent: true });
      currentHasDirectives = false;
    }
    return current;
  };

  content
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((rawLine, index) => {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) {
        return;
      }

      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) {
        if (diagnostics) {
          diagnostics.push({
            line: index + 1,
            directive: line,
            reason: 'Missing ":" separator',
          });
        }
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      const keyLower = key.toLowerCase();
      const value = line.slice(separatorIndex + 1).trim();

      if (!KNOWN_DIRECTIVES.has(keyLower)) {
        if (diagnostics) {
          diagnostics.push({
            line: index + 1,
            directive: key,
            reason: "Unknown directive",
          });
        }
        return;
      }

      if (SITEMAP_REGEX.test(key)) {
        if (value) {
          sitemap.push(value);
        }
        return;
      }

      if (HOST_REGEX.test(key)) {
        if (value) {
          host = value;
        }
        return;
      }

      if (CLEAN_PARAM_REGEX.test(key)) {
        if (value) {
          cleanParams.push(value);
        }
        return;
      }

      if (USER_AGENT_REGEX.test(key)) {
        if (current && current.autoUserAgent) {
          updateRule(current, { userAgent: value || "*" });
          delete current.autoUserAgent;
        } else if (!current || currentHasDirectives) {
          current = startRule(rules, value || "*");
        } else {
          updateRule(current, {
            userAgent: appendUserAgent(current.userAgent, value || "*"),
          });
        }
        currentHasDirectives = false;
        return;
      }

      const rule = ensureRule();

      if (ALLOW_REGEX.test(key)) {
        updateRule(rule, { allow: appendDirectiveValue(rule.allow, value) });
        currentHasDirectives = true;
        return;
      }

      if (DISALLOW_REGEX.test(key)) {
        updateRule(rule, {
          disallow: appendDirectiveValue(rule.disallow, value),
        });
        currentHasDirectives = true;
        return;
      }

      if (CRAWL_DELAY_REGEX.test(key)) {
        const numeric = Number(value);
        updateRule(rule, {
          crawlDelay: Number.isFinite(numeric) ? numeric : value,
        });
        currentHasDirectives = true;
        return;
      }

      if (CACHE_DELAY_REGEX.test(key)) {
        const numeric = Number(value);
        updateRule(rule, {
          cacheDelay: Number.isFinite(numeric) ? numeric : value,
        });
        currentHasDirectives = true;
        return;
      }

      if (VISIT_TIME_REGEX.test(key)) {
        updateRule(rule, {
          visitTime: appendDirectiveValue(rule.visitTime, value),
        });
        currentHasDirectives = true;
      }
    });

  const sanitizedRules = rules.map((ruleEntry) => {
    const { autoUserAgent, ...cleanRule } = ruleEntry;
    return cleanRule;
  });

  return {
    rules: sanitizedRules,
    sitemap,
    host,
    cleanParams,
    errors: diagnostics,
  };
}
