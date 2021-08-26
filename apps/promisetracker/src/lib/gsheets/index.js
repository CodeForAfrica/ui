import { camelCase } from "lodash";
import papa from "papaparse";

import cache from "@/promisetracker/lib/cache";
import serverFn from "@/promisetracker/lib/server";
import theme from "@/promisetracker/theme";
import { equalsIgnoreCase } from "@/promisetracker/utils";

function gsheets(siteSlug) {
  const server = serverFn(siteSlug);
  const SPREADSHEETS_URL = "https://docs.google.com/spreadsheets/";
  const spreadsheetId = server.env("GSHEETS_SPREADSHEET_ID");
  const entitiesSheetId = server.env("GSHEETS_ENTITIES_SHEET_ID");
  const sitesSheetId = server.env("GSHEETS_SITES_SHEET_ID");
  const statusesSheetId = server.env("GSHEETS_STATUSES_SHEET_ID");
  const categoriesSheetId = server.env("GSHEETS_CATEGORIES_SHEET_ID");
  const promisesSheetId = server.env("GSHEETS_PROMISES_SHEET_ID");
  const promisesCategoriesSheetId = server.env(
    "GSHEETS_PROMISES_CATEGORIES_SHEET_ID"
  );
  const promisesEventsSheetId = server.env("GSHEETS_PROMISES_EVENTS_SHEET_ID");

  const papaOptions = {
    header: true,
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

  async function fetchSite() {
    const sitesSheet = await fetchSitesSheet();
    const entitiesSheet = await fetchSheet(entitiesSheetId);
    const siteRow = siteSlug
      ? sitesSheet.find((row) => equalsIgnoreCase(siteSlug, row.slug))
      : sitesSheet[0];
    const entity = entitiesSheet.find((row) =>
      equalsIgnoreCase(row.name, siteRow.entity)
    );
    return { ...siteRow, entity };
  }

  async function fetchCategories() {
    const categoriesSheet = await fetchSheet(categoriesSheetId);
    return categoriesSheet.filter((row) => row.name);
  }

  async function fetchStatuses() {
    const statusesSheet = await fetchSheet(statusesSheetId);
    const { statusPalette } = theme;
    const getPalette = (ordinal) =>
      statusPalette[`status${ordinal}`] || statusPalette.status0;
    return statusesSheet.map((row) => ({ ...row, ...getPalette(row.ordinal) }));
  }

  function reduceByName(acc, current) {
    // FIXME(kilemensi): Some components expect title instead of name
    acc[camelCase(current.name)] = { ...current, title: current.name };
    return acc;
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

  async function fetchPromises(site) {
    const statuses = (await fetchStatuses()).reduce(reduceByName, {});
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
          category: promisesCategories.flatMap(({ promise, ...category }) => {
            if (equalsIgnoreCase(promise.id, other.id)) {
              return [category];
            }
            return [];
          }),
          events: promisesEvents.flatMap(({ promise, ...event }) => {
            if (equalsIgnoreCase(promise.id, other.id)) {
              return [event];
            }
            return [];
          }),
          status: {
            ...statuses?.[camelCase(other.status)],
            date: statusVerificationDate,
          },
        }))
    );
  }

  const fetchFor = {
    site: fetchSite,
    promises: fetchPromises,
  };
  const gcache = cache(siteSlug, { fetchFor });
  const api = {
    sites: () => ({
      get current() {
        return (async () => {
          return gcache.site;
        })();
      },
    }),
    promises: () => ({
      get all() {
        return (async () => {
          const { data: promises } = await gcache.promises;
          return promises;
        })();
      },
      get key() {
        return (async () => {
          const { data: promises } = await gcache.promises;
          return promises.filter((promise) => promise.isKey);
        })();
      },
    }),
  };

  return api;
}

export default gsheets;
