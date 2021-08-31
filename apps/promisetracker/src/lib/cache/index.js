import fs from "fs";
import path from "path";

const PROMISES_CACHE_FILENAME = "promises.json";
const SITES_CACHE_FILENAME = "sites.json";

// async function fetchAllNodes(url, options = { headers }, times = 0) {
//   const response = await fetch(url, options);
//   const resjson = await response.json();
//   const data = resjson.results;
//   if (resjson.next) {
//     const nextData = await fetchAllNodes(resjson.next, options, times + 1);
//     return { ...nextData, results: data.concat(nextData.results) };
//   }

//   return { ...resjson, results: data };
// }

// async function fetchNodes(days = 7) {
//   const toDate = new Date();
//   const fromDate = toDate.setDate(toDate.getDate() - days);
//   const lastNotify = new Date(fromDate).toISOString();

//   return fetchAllNodes(
//     `https://api.sensors.africa/v1/node?last_notify__gte=${lastNotify}`
//   );
// }

function cache(server, { fetchFor }) {
  const CACHE_TIMEOUT = Number.parseInt(server.env("CACHE_TIMEOUT"), 10);

  async function read(filename) {
    const publicDirectory = path.join(process.cwd(), "public/data");
    const filePath = path.join(publicDirectory, filename);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  async function write(filename, data) {
    const publicDirectory = path.join(process.cwd(), "public/data");
    const filePath = path.join(publicDirectory, filename);
    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
  }

  async function load(filename, fetchNew) {
    let cached;
    try {
      cached = await read(filename);
    } catch (error) {
      cached = null;
    }
    if (!cached || cached.lastUpdated < Date.now() - CACHE_TIMEOUT * 1000) {
      cached = await fetchNew();
      write(PROMISES_CACHE_FILENAME, cached);
    }

    return cached;
  }

  const api = {
    get site() {
      return (async () => {
        const fetchNew = async () => {
          const data = await fetchFor.site();
          return { lastUpdated: Date.now(), data };
        };
        return load(SITES_CACHE_FILENAME, fetchNew);
      })();
    },
    get promises() {
      return (async () => {
        const fetchNew = async () => {
          const site = await api.site;
          const data = await fetchFor.promises(site.data);
          return { count: data.length, lastUpdated: Date.now(), data };
        };
        return load(PROMISES_CACHE_FILENAME, fetchNew);
      })();
    },
  };

  return api;
}

export default cache;
