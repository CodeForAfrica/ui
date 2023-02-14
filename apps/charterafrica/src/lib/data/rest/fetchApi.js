import { stringify } from "qs";

const headers = {
  "Content-Type": "application/json",
};

async function fetchFunc(url, { method, data, params, ...args }) {
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
  return response;
}

async function postApi(url, args) {
  return fetchFunc(url, { ...args, method: "POST" });
}

async function getApi(url, args) {
  return fetchFunc(url, { ...args, method: "GET" });
}

export default {
  get: getApi,
  post: postApi,
};
