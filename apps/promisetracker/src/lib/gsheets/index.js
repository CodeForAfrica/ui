import { camelCase, merge } from "lodash";
import papa from "papaparse";

import config from "@/promisetracker/config";
import cacheFn from "@/promisetracker/lib/cache";
import articlesQLFn from "@/promisetracker/lib/jsonql/articles";
import factChecksQLFn from "@/promisetracker/lib/jsonql/factChecks";
import promisesQLFn from "@/promisetracker/lib/jsonql/promises";
import theme from "@/promisetracker/theme";
import { equalsIgnoreCase, formatDate, slugify } from "@/promisetracker/utils";

function gsheets(server) {
  const SPREADSHEETS_URL = "https://docs.google.com/spreadsheets/";
  const spreadsheetId = server.env("GSHEETS_SPREADSHEET_ID");
  const sitesNavigationsSheetId = server.env(
    "GSHEETS_SITES_NAVIGATIONS_SHEET_ID"
  );
  const entitiesSheetId = server.env("GSHEETS_ENTITIES_SHEET_ID");
  const sitesSheetId = server.env("GSHEETS_SITES_SHEET_ID");
  const statusesSheetId = server.env("GSHEETS_STATUSES_SHEET_ID");
  const categoriesSheetId = server.env("GSHEETS_CATEGORIES_SHEET_ID");
  const promisesSheetId = server.env("GSHEETS_PROMISES_SHEET_ID");
  const promisesCategoriesSheetId = server.env(
    "GSHEETS_PROMISES_CATEGORIES_SHEET_ID"
  );
  const articlesCategoriesSheetId = server.env(
    "GSHEETS_ARTICLES_CATEGORIES_SHEET_ID"
  );
  const promisesEventsSheetId = server.env("GSHEETS_PROMISES_EVENTS_SHEET_ID");
  const articlesSheetId = server.env("GSHEETS_ARTICLES_SHEET_ID");
  const factChecksSheetId = server.env("GSHEETS_FACTCHECKS_SHEET_ID");

  const defaultLat = server.env("DEFAULT_LAT");
  const defaultLng = server.env("DEFAULT_LONG");

  function reduceByName(acc, current) {
    acc[camelCase(current.name)] = current;
    return acc;
  }

  const papaOptions = {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => camelCase(header.trim()),
    transform: (value) => value?.trim(),
  };

  const papaPromise = (readableStream, options = papaOptions) => {
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
    readableStream.pipe(parseStream);

    return new Promise((resolve, reject) => {
      const data = [];
      parseStream.on("data", (chunk) => {
        data.push(chunk);
      });
      parseStream.on("end", () => {
        resolve(data);
      });
      parseStream.on("error", (error) => {
        reject(error);
      });
    });
  };

  async function fetchSheet(sheetId, options) {
    const response = await fetch(
      `${SPREADSHEETS_URL}d/${spreadsheetId}/export?format=csv&gid=${sheetId}`
    );
    return papaPromise(response.body, options);
  }

  async function fetchSitesNavigationsSheet() {
    const options = {
      ...papaOptions,
      transform: (value) => value?.trim() || undefined,
    };
    const sitesNavigationsSheet = await fetchSheet(
      sitesNavigationsSheetId,
      options
    );
    return sitesNavigationsSheet
      .filter((row) => row.site)
      .map((row) => {
        const transformed = {};
        transformed.promises = { title: row.promises };
        transformed.actNow = { title: row.actNow };
        transformed.analysis = {
          title: row.analysis,
          navigation: {
            articles: { title: row.analysisArticles },
            petitions: { title: row.analysisPetitions },
            resources: { title: row.analysisResources },
            factChecks: { title: row.analysisFactChecks },
          },
        };
        return transformed;
      });
  }

  async function fetchSitesSheet() {
    const options = {
      ...papaOptions,
      dynamicTyping: (header) =>
        ["articles", "resources", "factchecks", "actnow"].includes(
          header.toLowerCase()
        ),
    };
    return fetchSheet(sitesSheetId, options);
  }

  async function fetchStatuses() {
    const statusesSheet = await fetchSheet(statusesSheetId);
    const { statusPalette } = theme;
    const getPalette = (ordinal) =>
      statusPalette[`status${ordinal}`] || statusPalette.status0;
    return statusesSheet.map((row) => ({
      ...row,
      ...getPalette(row.ordinal),
      // FIXME(kilemensi): Some components expect title instead of name
      title: row.name,
      slug: slugify(row.name),
    }));
  }

  async function fetchCategories() {
    const categoriesSheet = await fetchSheet(categoriesSheetId);
    return categoriesSheet
      .filter((row) => row.name)
      .map((row) => ({
        ...row,
        // FIXME(kilemensi): Some components expect title instead of name
        title: row.name,
        slug: slugify(row.name),
      }));
  }

  async function fetchSite() {
    const statuses = await fetchStatuses();
    const categories = await fetchCategories();
    const entitiesSheet = await fetchSheet(entitiesSheetId);
    const sitesNavigationsSheet = await fetchSitesNavigationsSheet();
    const sitesSheet = await fetchSitesSheet();
    const siteRow = server.slug
      ? sitesSheet.find((row) => equalsIgnoreCase(server.slug, row.slug))
      : sitesSheet[0];
    const entity = entitiesSheet.find((row) =>
      equalsIgnoreCase(row.name, siteRow.entity)
    );
    const {
      articles: articlesEnabled,
      resources: resourcesEnabled,
      factChecks: factChecksEnabled,
      actNow: actNowEnabled,
      ...site
    } = siteRow;
    const navigationRow =
      sitesNavigationsSheet.find((row) =>
        equalsIgnoreCase(row.site, siteRow.slug)
      ) || {};
    const navigation = merge({}, config.site.header.navigation, navigationRow);
    const {
      analysis: { navigation: analysisNavigation },
    } = navigation;
    if (!articlesEnabled) {
      delete analysisNavigation.articles;
    }
    if (!resourcesEnabled) {
      delete analysisNavigation.resources;
    }
    if (!factChecksEnabled) {
      delete analysisNavigation.factChecks;
    }
    if (!actNowEnabled) {
      delete analysisNavigation.petitions;
      delete navigation.actNow;
    }
    navigation.analysis.navigation = Object.keys(analysisNavigation)
      .map((k) => analysisNavigation[k])
      .sort((a, b) => a.order > b.order);

    return {
      ...site,
      actNowEnabled,
      articlesEnabled,
      factChecksEnabled,
      resourcesEnabled,
      categories,
      entity,
      navigation,
      statuses,
    };
  }

  function formatSiteAsProjectMeta(site) {
    const { entity } = site;
    const description = `Campaign Promises made by ${entity.name}`;
    const fullName = entity.fullName || null;
    const name = entity.preferredName || entity.name || null;
    const photo = entity.image || null;
    const position = entity.title || null;
    const promiseLabel = "promises";
    const tagline = `<span class="highlight">Tracking</span> ${name}`;
    const tags = site.categories;
    const trailText = "at a glance";
    const updatedAt = formatDate(site.lastUpdated || Date.now);
    const updatedAtLabel = "Updated";
    return {
      description,
      fullName,
      name,
      photo,
      position,
      promiseLabel,
      tagline,
      tags,
      trailText,
      updatedAt,
      updatedAtLabel,
    };
  }
  async function fetchArticlesCategories() {
    const categories = (await fetchCategories()).reduce(reduceByName, {});
    const categoriesSheet = await fetchSheet(articlesCategoriesSheetId);

    return categoriesSheet
      .filter((row) => row.id && row.category)
      .map(({ id, category }) => {
        return { ...categories[camelCase(category)], article: { id } };
      })
      .filter((row) => row.article.id);
  }

  async function fetchArticles(cache) {
    const { data: site } = await cache.site;
    const articlesSheet = await fetchSheet(articlesSheetId);
    const articleCategories = await fetchArticlesCategories();

    return articlesSheet
      .filter((row) => equalsIgnoreCase(row.site, site.slug))
      .map(({ photo, ...others }) => ({
        ...others,
        photo,
        categories: articleCategories.flatMap(({ article, ...category }) => {
          if (equalsIgnoreCase(article.id, others.id)) {
            return [category];
          }
          return [];
        }),
        image: photo,
      }));
  }

  async function fetchFactChecks(cache) {
    const { data: site } = await cache.site;
    const factChecksSheet = await fetchSheet(factChecksSheetId);

    return factChecksSheet
      .filter((row) => equalsIgnoreCase(row.site, site.slug))
      .map(({ photo, ...others }) => ({ ...others, photo, image: photo }));
  }

  function extractIdFromEntityPromise(promise) {
    // idET = (promise) id, (entity) Name and (promise) Title
    const idNT = promise.split("/");
    return idNT.length > 1 ? idNT[0]?.trim() : undefined;
  }

  async function fetchPromisesCategories() {
    const categories = (await fetchCategories()).reduce(reduceByName, {});
    const pcSheet = await fetchSheet(promisesCategoriesSheetId);

    return pcSheet
      .filter((row) => row.promise && row.category)
      .map(({ promise, category }) => {
        const id = extractIdFromEntityPromise(promise);
        return { ...categories[camelCase(category)], promise: { id } };
      })
      .filter((row) => row.promise.id);
  }

  async function fetchPromisesEvents() {
    const peSheet = await fetchSheet(promisesEventsSheetId);

    return peSheet
      .filter((row) => row.promise && row.name && row.date)
      .map(({ promise, ...event }) => {
        const id = extractIdFromEntityPromise(promise);
        return { ...event, promise: { id } };
      })
      .filter((row) => row.promise.id);
  }

  function formatLocation(latlng) {
    const [latStr, lngStr] = latlng?.split(",") ?? [defaultLat, defaultLng];
    if (latStr && lngStr) {
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return [lat, lng];
      }
    }
    return null;
  }

  async function fetchPromises(cache) {
    const { data: site } = await cache.site;
    const statuses = site.statuses.reduce(reduceByName, {});
    const promisesOptions = {
      ...papaOptions,
      dynamicTyping: (header) => ["iskey"].includes(header.toLowerCase()),
    };
    const promisesSheet = await fetchSheet(promisesSheetId, promisesOptions);
    const promisesCategories = await fetchPromisesCategories();
    const promisesEvents = await fetchPromisesEvents();

    return (
      promisesSheet
        .filter((row) => equalsIgnoreCase(row.entity, site.entity.name))
        // 1. promise entity is only used to filter promises belonging to a
        // given site. Shouldn't exist in final promise data.
        // 2. statusVerificationDate should be part of status
        .map(({ entity, statusVerificationDate, ...other }) => ({
          ...other,
          categories: promisesCategories.flatMap(({ promise, ...category }) => {
            if (equalsIgnoreCase(promise.id, other.id)) {
              return [category];
            }
            return [];
          }),
          date: statusVerificationDate,
          events: promisesEvents.flatMap(({ promise, ...event }) => {
            if (equalsIgnoreCase(promise.id, other.id)) {
              return [event];
            }
            return [];
          }),
          location: formatLocation(other.location),
          slug: slugify(other.title),
          status: {
            ...statuses?.[camelCase(other.status)],
            date: statusVerificationDate,
          },
          // TODO(kilemensi): We should change UI components to just use
          //                  status rather than duplicating it here.
          statusHistory: [
            {
              ...statuses?.[camelCase(other.status)],
              date: statusVerificationDate,
            },
          ],
        }))
    );
  }

  const fetchFor = {
    site: fetchSite,
    articles: fetchArticles,
    promises: fetchPromises,
    factChecks: fetchFactChecks,
  };
  const gcache = cacheFn(server, fetchFor);

  async function articlesQL() {
    const { data: articles } = await gcache.articles;
    return articlesQLFn(articles);
  }

  async function factChecksQL() {
    const { data: factChecks } = await gcache.factChecks;
    return factChecksQLFn(factChecks);
  }

  async function promisesQL() {
    const { data: promises } = await gcache.promises;
    return promisesQLFn(promises);
  }

  const api = {
    sites: () => ({
      get current() {
        return (async () => {
          const { data: site } = await gcache.site;
          return site;
        })();
      },
    }),
    // TODO(kilemensi): This should be replaced by current but it requires
    //                  changing components first.
    project: () => ({
      get meta() {
        return (async () => {
          const site = await api.sites().current;
          return formatSiteAsProjectMeta(site);
        })();
      },
    }),
    articles: (options) => {
      return {
        get all() {
          return (async () => {
            const site = await api.sites().current;
            if (!site.articlesEnabled) {
              return null;
            }
            const ql = await articlesQL();
            return ql.getArticles(options);
          })();
        },
        get first() {
          return (async () => {
            const site = await api.sites().current;
            if (!site.articlesEnabled) {
              return null;
            }
            const ql = await articlesQL();
            return ql.getArticle(options);
          })();
        },
      };
    },
    factChecks: (options) => {
      return {
        get all() {
          return (async () => {
            const site = await api.sites().current;
            if (!site.factChecksEnabled) {
              return null;
            }
            const ql = await factChecksQL();
            return ql.getFactChecks(options);
          })();
        },
      };
    },
    promises: (options) => {
      return {
        get all() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getPromises(options);
          })();
        },
        get categories() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getCategories();
          })();
        },
        get first() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getPromise(options);
          })();
        },
        get key() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getPromises({ ...options, isKey: true });
          })();
        },
        get statuses() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getStatuses();
          })();
        },
      };
    },
  };

  return api;
}

export default gsheets;
