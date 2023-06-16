import { stringify } from "qs";

export class FetchError extends Error {
  constructor(message = "Something went wrong", data = {}, status = 500) {
    super();
    this.message = message;
    this.data = data;
    this.status = status;
  }
}

const headers = {
  "Content-Type": "application/json",
};

async function fetchJson(url, { method, data, params, ...args }) {
  const stringifiedQuery = stringify(params || {}, {
    addQueryPrefix: true,
  });
  const queryUrl = `${url}${params ? stringifiedQuery : ""}`;
  const res = await fetch(queryUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    ...args,
  });
  const response = await res.json();
  if (res.ok) {
    return response;
  }
  response.headers = res.headers;
  throw new FetchError(
    `Request to ${url} failed with status ${res.status}`,
    response,
    res.status
  );
}

async function postJson(url, args) {
  return fetchJson(url, { ...args, method: "POST" });
}

async function getJson(url, args) {
  return fetchJson(url, { ...args, method: "GET" });
}

export default {
  get: getJson,
  post: postJson,
};
