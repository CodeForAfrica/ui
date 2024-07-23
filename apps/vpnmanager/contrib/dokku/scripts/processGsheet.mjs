async function main() {
  const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  const API_SECRET_KEY = process.env.API_SECRET_KEY;
  const headers = {
    "x-api-key": API_SECRET_KEY ?? "",
  };
  const res = await fetch(`${NEXT_PUBLIC_APP_URL}/api/processGsheet`, {
    headers,
  });
  return res.json();
}

const responseJson = await main();
console.log(responseJson);
