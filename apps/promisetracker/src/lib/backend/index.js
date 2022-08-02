import gsheetsFn from "@/promisetracker/lib/gsheets";
import serverFn from "@/promisetracker/lib/server";
import staticFn from "@/promisetracker/lib/static-backend";

function backend(siteSlug) {
  const server = serverFn(siteSlug);
  const backendChoice = server.env("BACKEND");
  switch (backendChoice?.toUpperCase()) {
    case "GSHEET":
      return gsheetsFn(server);
    default:
      return staticFn(server);
  }
}

export default backend;
