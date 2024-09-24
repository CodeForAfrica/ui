import { fetchApi } from "./fetchApi.mjs";

async function main() {
  const response = await fetchApi("/api/users");
  return response;
}

await main();
