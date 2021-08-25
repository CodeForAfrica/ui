// import isEmpty from "lodash/isEmpty";
import { camelCase } from "lodash";
import papa from "papaparse";

// import config from "@/promisetracker/config";
import cache from "@/promisetracker/lib/cache";
import server from "@/promisetracker/lib/server";
// import { formatDate } from "@/promisetracker/utils";

function gsheets(siteSlug) {
  const siteServer = server(siteSlug);
  const SPREADSHEETS_URL = "https://docs.google.com/spreadsheets/";
  const spreadsheetId = process.env[`${siteServer.site}GSHEETS_SPREADSHEET_ID`];
  const entitiesSheetId =
    process.env[`${siteServer.site}GSHEETS_ENTITIES_SHEET_ID`];
  const sitesSheetId = process.env[`${siteServer.site}GSHEETS_SITES_SHEET_ID`];
  const papaOptions = {
    header: true,
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

  const fetchSitesSheet = async () => {
    const options = {
      ...papaOptions,
      transformHeader: (header) => camelCase(header.trim()),
    };
    const response = await fetch(
      `${SPREADSHEETS_URL}d/${spreadsheetId}/export?format=csv&gid=${sitesSheetId}`
    );
    return papaPromise(response.body, options);
  };

  const fetchEntitiesSheet = async () => {
    const options = {
      ...papaOptions,
      transformHeader: (header) => camelCase(header.trim()),
    };
    const response = await fetch(
      `${SPREADSHEETS_URL}d/${spreadsheetId}/export?format=csv&gid=${entitiesSheetId}`
    );
    return papaPromise(response.body, options);
  };

  const fetchSite = async () => {
    const sitesSheets = await fetchSitesSheet();
    const siteSheet = siteSlug
      ? sitesSheets.find(
          (sheet) =>
            siteSlug.localeCompare(sheet.slug, "en", {
              sensitivity: "base",
            }) === 0
        )
      : sitesSheets[0];
    const entitiesSheets = await fetchEntitiesSheet();
    const entity = entitiesSheets.find(
      (entitySheet) => entitySheet.name === siteSheet.entity
    );
    return { ...siteSheet, entity };
  };

  const fetchFor = {
    site: fetchSite,
  };
  const gcache = cache({ fetchFor });
  const api = {
    sites: () => ({
      get first() {
        return (async () => {
          return gcache.site;
        })();
      },
    }),
  };

  return api;
}

export default gsheets;
