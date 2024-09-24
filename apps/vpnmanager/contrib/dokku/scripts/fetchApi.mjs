export async function fetchApi(endpoint, method = "POST", body = null) {
  const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  const API_SECRET_KEY = process.env.API_SECRET_KEY;

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_SECRET_KEY ?? "",
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${NEXT_PUBLIC_APP_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`API call failed with status ${res.status}`);
  }

  return res.json();
}
