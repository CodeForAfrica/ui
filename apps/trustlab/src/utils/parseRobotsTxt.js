const KNOWN_DIRECTIVES = new Set([
  "user-agent",
  "allow",
  "disallow",
  "crawl-delay",
  "sitemap",
  "host",
  "cache-delay",
]);

const normalize = (value) =>
  typeof value === "string" ? value : `${value ?? ""}`;

const unwrap = (list) => {
  if (!Array.isArray(list)) {
    return list;
  }
  if (list.length === 0) {
    return undefined;
  }
  return list.length === 1 ? list[0] : list;
};

const pushError = (errors, line, directive, reason) => {
  if (!errors) {
    return;
  }
  errors.push({ line, directive, reason });
};

/**
 * Parses a robots.txt string into a Next.js-compatible robots metadata object.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#robots-object
 *
 * @param {string} raw - robots.txt content
 * @param {{ collectDiagnostics?: boolean }} options
 * @returns {{ rules: import("next").Metadata["robots"]["rules"], sitemap?: string | string[], host?: string, errors?: Array<{ line: number, directive?: string, reason: string }> }}
 */
export default function parseRobotsToNextJs(raw = "", options = {}) {
  const { collectDiagnostics = false } = options;
  const diagnostics = collectDiagnostics ? [] : undefined;
  const lines = normalize(raw).replace(/\r\n?/g, "\n").split("\n");

  const groups = []; // { userAgent: string[], allow: string[], disallow: string[], crawlDelay?: number }
  const sitemaps = [];
  let host = null;
  let cur = null;
  let curHasDirectives = false;

  const ensureGroup = (lineNumber, directive) => {
    if (!cur) {
      cur = { userAgent: ["*"], allow: [], disallow: [] };
      groups.push(cur);
      curHasDirectives = false;
      pushError(
        diagnostics,
        lineNumber,
        directive,
        "Directive applied before any User-agent; defaulting to *",
      );
    }
    return cur;
  };

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1;
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) {
      return;
    }

    const sep = line.indexOf(":");
    if (sep === -1) {
      pushError(diagnostics, lineNumber, line, 'Missing ":" separator');
      return;
    }

    const key = line.slice(0, sep).trim().toLowerCase();
    const val = line.slice(sep + 1).trim();

    if (!KNOWN_DIRECTIVES.has(key)) {
      pushError(diagnostics, lineNumber, key || line, "Unknown directive");
      return;
    }

    if (!val && key !== "disallow") {
      pushError(diagnostics, lineNumber, key, "Empty directive value");
      return;
    }

    switch (key) {
      case "sitemap":
        sitemaps.push(val);
        break;

      case "host":
        if (host && host !== val) {
          pushError(
            diagnostics,
            lineNumber,
            key,
            `Host already set to "${host}"`,
          );
        } else {
          host = val;
        }
        break;

      case "user-agent":
        if (!val) {
          pushError(diagnostics, lineNumber, key, "User-agent cannot be empty");
          break;
        }
        if (!cur || curHasDirectives) {
          cur = { userAgent: [val], allow: [], disallow: [] };
          groups.push(cur);
          curHasDirectives = false;
        } else {
          cur.userAgent.push(val);
        }
        break;
      case "allow":
        ensureGroup(lineNumber, key).allow.push(val);
        curHasDirectives = true;
        break;

      case "disallow":
        ensureGroup(lineNumber, key).disallow.push(val);
        curHasDirectives = true;
        break;
      case "crawl-delay": {
        const n = Number(val);
        if (Number.isFinite(n)) {
          ensureGroup(lineNumber, key).crawlDelay = n;
        } else {
          pushError(
            diagnostics,
            lineNumber,
            key,
            "Crawl-delay must be numeric",
          );
        }
        curHasDirectives = true;
        break;
      }

      case "cache-delay":
        pushError(
          diagnostics,
          lineNumber,
          key,
          "Directive not supported in Next.js robots metadata",
        );
        break;

      default:
        break;
    }
  });

  const rules = groups.map((g) => {
    const rule = { userAgent: unwrap(g.userAgent) };
    const allow = unwrap(g.allow);
    const disallow = unwrap(g.disallow);
    if (allow !== undefined && allow !== "") {
      rule.allow = allow;
    }
    if (disallow !== undefined && disallow !== "") {
      rule.disallow = disallow;
    }
    if (g.crawlDelay !== undefined) {
      rule.crawlDelay = g.crawlDelay;
    }
    return rule;
  });

  const result = {
    rules: rules.length === 1 ? rules[0] : rules,
  };
  const sitemap = unwrap(sitemaps);
  if (sitemap !== undefined) {
    result.sitemap = sitemap;
  }
  if (host) {
    result.host = host;
  }
  if (diagnostics) {
    result.errors = diagnostics;
  }
  return result;
}
