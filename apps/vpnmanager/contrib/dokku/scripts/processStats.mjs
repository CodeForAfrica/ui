import { apiClient } from "./apiClient.mjs";

async function main() {
  const response = await apiClient("/api/statistics");
  return response;
}

const responseJson = await main();
console.log(responseJson);
