// import isEmpty from "lodash/isEmpty";
import { camelCase } from "lodash";
import papa from "papaparse";

// import config from "@/promisetracker/config";
import server from "@/promisetracker/lib/server";
// import { formatDate } from "@/promisetracker/utils";

function gsheets(site) {
  const siteServer = server(site);
  const SPREADSHEETS_URL = "https://docs.google.com/spreadsheets/";
  const spreadsheetId = process.env[`${siteServer.site}GSHEETS_SPREADSHEET_ID`];
  // const entitiesSheetId =
  //   process.env[`${siteServer.site}GSHEETS_ENTITIES_SHEET_ID`];
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

  const getSites = async () => {
    const options = {
      ...papaOptions,
      transformHeader: (header) => camelCase(header.trim()),
    };
    const response = await fetch(
      `${SPREADSHEETS_URL}d/${spreadsheetId}/export?format=csv&gid=${sitesSheetId}`
    );
    const sites = await papaPromise(response.body, options);
    return sites;
  };

  const api = {
    sites: ({ slug, locale = siteServer.defaultLocale }) => ({
      get first() {
        return (async () => {
          return getSites(slug, locale);
        })();
      },
    }),
  };

  return api;
}

export default gsheets;
