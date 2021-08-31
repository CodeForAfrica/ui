import fs from "fs";
import path from "path";

const PROMISES_CACHE_FILENAME = "promises.json";
const SITES_CACHE_FILENAME = "sites.json";

function getFilePath(filename) {
  const publicDirectory = path.join(process.cwd(), "public/data");
  return path.join(publicDirectory, filename);
}

function cache(server, fetchFor) {
  const CACHE_TIMEOUT = Number.parseInt(server.env("CACHE_TIMEOUT"), 10);

  async function read(filename) {
    const filePath = getFilePath(filename);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  async function write(filename, data) {
    const filePath = getFilePath(filename);
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
      write(filename, cached);
    }

    return cached;
  }

  const api = {
    get site() {
      return (async () => {
        const fetchNew = async () => {
          const data = await fetchFor.site(this);
          return { lastUpdated: Date.now(), data };
        };
        return load(SITES_CACHE_FILENAME, fetchNew);
      })();
    },
    get promises() {
      return (async () => {
        const fetchNew = async () => {
          const data = await fetchFor.promises(this);
          return { count: data.length, lastUpdated: Date.now(), data };
        };
        return load(PROMISES_CACHE_FILENAME, fetchNew);
      })();
    },
  };

  return api;
}

export default cache;
