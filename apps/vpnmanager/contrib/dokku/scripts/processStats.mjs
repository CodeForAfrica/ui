import { apiClient } from "./apiClient.mjs";

async function main() {
  const response = await apiClient("/api/statistics");
  return response;
}

await main();
