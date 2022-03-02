import { readFile, writeFile } from "fs/promises";
import path from "path";

const ARTICLES_CACHE_FILENAME = "articles.json";
const FACTCHECKS_CACHE_FILENAME = "factchecks.json";
const PROMISES_CACHE_FILENAME = "promises.json";
const SITES_CACHE_FILENAME = "sites.json";

function getFilePath(filename) {
  const publicDirectory = path.join(process.cwd(), "public/data");
  return path.join(publicDirectory, filename);
}

function cache(server, fetchFor) {
  const CACHE_TIMEOUT = Number.parseInt(server.env("CACHE_TIMEOUT"), 10);

  async function read(filename) {
    const file = getFilePath(filename);
    const data = await readFile(file, { encoding: "utf8" });
    return JSON.parse(data);
  }

  async function write(filename, jsonData) {
    const file = getFilePath(filename);
    const data = JSON.stringify(jsonData, undefined, 2);
    return writeFile(file, data, { encoding: "utf8" });
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
      await write(filename, cached);
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
    get articles() {
      return (async () => {
        const fetchNew = async () => {
          const data = await fetchFor.articles(this);
          return { count: data.length, lastUpdated: Date.now(), data };
        };
        return load(ARTICLES_CACHE_FILENAME, fetchNew);
      })();
    },
    get factChecks() {
      return (async () => {
        const fetchNew = async () => {
          const data = await fetchFor.factChecks(this);
          return { count: data.length, lastUpdated: Date.now(), data };
        };
        return load(FACTCHECKS_CACHE_FILENAME, fetchNew);
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
