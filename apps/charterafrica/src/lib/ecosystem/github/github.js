import * as Sentry from "@sentry/nextjs";

import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

const BASE_URL = "https://api.github.com";

async function graphQuery(query, variables) {
  const url = `${BASE_URL}/graphql`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
  const data = {
    variables,
    query,
  };
  const res = await fetchJson.post(url, { data, headers });
  if (res?.data) {
    return res.data;
  }
  const message = `Unable to fetch from github errors ${JSON.stringify(
    res.errors,
  )}`;
  Sentry.captureException(message);
  throw new FetchError(message, res.errors, 500);
}

async function restQuery(path, tag) {
  const url = `${BASE_URL}/${path}`;
  const headers = {
    "If-None-Match": tag,
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
  try {
    const res = await fetch(url, { headers });
    if (res.ok) {
      const response = await res.json();
      const eTag = res.headers.get("ETag");
      return { ...response, eTag };
    }
    if (res.status !== 304) {
      const response = await res.json();
      const message = `Error fetching "${url}" from github errors ${JSON.stringify(
        response,
      )}`;
      throw new FetchError(message, res, 500);
    }
    return null;
  } catch (e) {
    Sentry.captureException(e);
    return null;
  }
}

export default {
  graphQuery,
  restQuery,
};
