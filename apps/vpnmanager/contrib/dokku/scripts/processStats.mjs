import { fetchApi } from "./fetchApi.mjs";

async function main() {
  const response = await fetchApi("/api/statistics");
  return response;
}

await main();
