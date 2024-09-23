import { apiClient } from "./apiClient.mjs";

async function main() {
  const response = await apiClient("/api/users");
  return response;
}

await main();
