import gsheetsFn from "@/promisetracker/lib/gsheets";
import serverFn from "@/promisetracker/lib/server";

function backend(siteSlug) {
  const server = serverFn(siteSlug);
  const backendChoice = server.env("BACKEND");
  switch (backendChoice?.toUpperCase()) {
    case "GSHEET":
      return gsheetsFn(server);
    default:
      throw new Error("BACKEND not selected");
  }
}

export default backend;
