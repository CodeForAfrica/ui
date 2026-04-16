import * as Sentry from "@sentry/nextjs";

import { site } from "@/trustlab/utils";

function normalizePathname(pathname) {
  if (!pathname || typeof pathname !== "string") {
    return null;
  }

  if (pathname === "/") {
    return pathname;
  }

  const trimmed = pathname.trim();
  if (!trimmed) {
    return null;
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function getAbsoluteUrl(pathname) {
  const normalizedPathname = normalizePathname(pathname);
  if (!normalizedPathname) {
    return null;
  }

  const siteUrl = site.url.replace(/\/+$/, "");
  return `${siteUrl}${normalizedPathname}`;
}

function getLastModified(doc) {
  const rawDate = doc?.updatedAt || doc?.createdAt;
  if (!rawDate) {
    return null;
  }

  const parsedDate = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString();
}

function toSitemapEntry(doc, pathname) {
  const url = getAbsoluteUrl(pathname);
  if (!url) {
    return null;
  }

  return {
    url,
    lastModified: getLastModified(doc),
  };
}

async function getPagesEntries(api) {
  const { docs } = await api.getCollection("pages", {
    pagination: false,
    select: {
      pathname: true,
      slug: true,
      parent: true,
      breadcrumbs: true,
      updatedAt: true,
      createdAt: true,
    },
    where: {
      and: [
        {
          _status: {
            equals: "published",
          },
        },
        {
          slug: {
            not_in: ["404", "500"],
          },
        },
      ],
    },
  });

  return docs
    .map((doc) => {
      if (!doc?.pathname) {
        Sentry.logger.warn("Page without `pathname` in sitemap", {
          slug: doc?.slug,
        });
        return null;
      }

      return toSitemapEntry(doc, doc.pathname);
    })
    .filter(Boolean);
}

async function getSitemapEntries(api) {
  const pages = await getPagesEntries(api);
  return pages.sort((left, right) => left.url.localeCompare(right.url));
}

async function buildSitemapXml(api) {
  const entries = await getSitemapEntries(api);
  const xmlEntries = entries
    .map(({ url, lastModified }) => {
      const lastModifiedNode = lastModified
        ? `\n    <lastmod>${lastModified}</lastmod>`
        : "";

      return `  <url>\n    <loc>${url}</loc>${lastModifiedNode}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`;
}

export default buildSitemapXml;
