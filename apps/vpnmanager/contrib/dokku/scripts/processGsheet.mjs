import { fetchJson } from "./fetchJson.mjs";

async function main() {
  return fetchJson("/api/users");
}

await main();
