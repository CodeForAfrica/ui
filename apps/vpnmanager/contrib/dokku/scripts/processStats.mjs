import { fetchJson } from "./fetchJson.mjs";

async function main() {
  return fetchJson("/api/statistics");
}

await main();
