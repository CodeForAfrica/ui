import { subDays } from "date-fns";

import fetchJson from "@/twoopstracker/utils/fetchJson";

const BASE_URL = process.env.TWOOPSTRACKER_API_URL;

export async function lists({ download, page, pageSize, sort }, session) {
  const searchParams = new URLSearchParams();
  if (download) {
    searchParams.append("download", download);
  }
  if (page) {
    searchParams.append("page", page);
  }
  if (pageSize) {
    searchParams.append("page_size", pageSize);
  }
  if (sort) {
    let sortBy;
    switch (sort.replace(/^-/, "")) {
      case "created-at":
        sortBy = "created_at";
        break;
      case "name":
        sortBy = "name";
        break;
      default:
        sortBy = null;
        break;
    }
    if (sortBy) {
      const sortOrder = sort.startsWith("-") ? "-" : "";
      searchParams.append("ordering", `${sortOrder}${sortBy}`);
    }
  }

  const result = await fetchJson(
    `${BASE_URL}/lists/?${searchParams.toString()}`,
    session,
  );
  return result;
}

export async function tweeterAccountsList(id, session) {
  return fetchJson(`${BASE_URL}/lists/${id}`, session);
}

export async function tweeterAccounts(query, session) {
  const searchParams = new URLSearchParams();
  const { list, page, pageSize, sort } = query || {};

  if (list) {
    searchParams.append("list[]", list);
  }
  if (page) {
    searchParams.append("page", page);
  }
  if (pageSize) {
    searchParams.append("page_size", pageSize);
  }
  if (sort) {
    let sortBy;
    switch (sort.replace(/^-/, "")) {
      case "created-at":
        sortBy = "created_at";
        break;
      case "name":
        sortBy = "name";
        break;
      case "screen-name":
        sortBy = "screen_name";
        break;
      default:
        sortBy = null;
        break;
    }
    if (sortBy) {
      const sortOrder = sort.startsWith("-") ? "-" : "";
      searchParams.append("ordering", `${sortOrder}${sortBy}`);
    }
  }

  const result = await fetchJson(
    `${BASE_URL}/accounts/?${searchParams.toString()}`,
    session,
  );
  return result;
}

export async function APIRequest(payload, method, session, query) {
  let url = BASE_URL;
  const { accounts, listId: param, page, pageSize, del, sort } = query;

  const listParams = new URLSearchParams();
  if (page) {
    listParams.append("page", query.page);
  }
  if (pageSize) {
    listParams.append("page_size", query.pageSize);
  }
  if (sort) {
    let sortBy;
    switch (sort.replace(/^-/, "")) {
      case "created-at":
        sortBy = "created_at";
        break;
      case "name":
        sortBy = "name";
        break;
      case "screen-name":
        sortBy = "screen_name";
        break;
      default:
        sortBy = null;
        break;
    }
    if (sortBy) {
      const sortOrder = sort.startsWith("-") ? "-" : "";
      listParams.append("ordering", `${sortOrder}${sortBy}`);
    }
  }

  if (param && accounts) {
    url = listParams.toString()
      ? `${url}/accounts/?list[]=${param}&${listParams.toString()}`
      : `${url}/accounts/?list[]=${param}`;
  } else if (del) {
    url = `${url}/lists/${param}?accounts[]=${del}`;
  } else if (param) {
    url = `${url}/lists/${param}`;
  } else {
    url = `${url}/lists/`;
  }

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload) {
    options.body = payload;
  }

  return fetchJson(url, session, options);
}

export async function uploadFile(req, res, session) {
  const options = {
    method: req.method,
    responseType: "stream",
    headers: {
      "Content-Type": req.headers["content-type"], // which is multipart/form-data with boundary included
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: req,
  };
  const response = await fetch(`${BASE_URL}/lists/upload`, options);
  response.body.pipe(res);
  return response;
}

export function tweetsSearchParamsFromSearchQuery({
  category,
  query,
  location,
  days = 7,
  page,
  pageSize,
  download,
  sort,
}) {
  const searchParams = new URLSearchParams();
  if (query) {
    searchParams.append("query", query);
  }
  if (category) {
    searchParams.append("category", category);
  }
  if (location) {
    searchParams.append("location", location);
  }
  if (sort) {
    let sortBy;
    switch (sort.replace(/^-/, "")) {
      case "created-at":
        sortBy = "created_at";
        break;
      case "deleted-at":
        sortBy = "deleted_at";
        break;
      case "owner-screen-name":
        sortBy = "owner__screen_name";
        break;
      default:
        sortBy = null;
        break;
    }
    if (sortBy) {
      const sortOrder = sort.startsWith("-") ? "-" : "";
      searchParams.append("ordering", `${sortOrder}${sortBy}`);
    }
  }
  const date = new Date();
  const endDate = date.toISOString().substring(0, 10);
  // Ensure we load data for at least 1 day
  const startDate = subDays(date, Math.max(days, 1))
    .toISOString()
    .substring(0, 10);
  searchParams.append("start_date", startDate);
  searchParams.append("end_date", endDate);
  if (page) {
    searchParams.append("page", page);
  }
  if (pageSize) {
    searchParams.append("page_size", pageSize);
  }
  if (download) {
    searchParams.append("download", download);
  } else {
    searchParams.append("format", "json");
  }

  return searchParams;
}

export function tweetsUserQuery(requestQuery) {
  const {
    query,
    theme,
    location,
    days,
    page,
    pageSize,
    download,
    category,
    sort,
  } = requestQuery;

  return {
    query,
    theme,
    location,
    days,
    page,
    pageSize,
    download,
    category,
    sort,
  };
}

export function tweetsSearchQueryFromUserQuery(userQuery) {
  // this one
  const {
    query: term,
    theme,
    category,
    location,
    days: daysAsString,
    page,
    pageSize,
    download,
    sort,
  } = userQuery || {};

  let query;
  if (theme) {
    query = theme;
  } else {
    query = term;
  }
  if (term && theme) {
    query = `${term} "${theme}"`;
  }

  let days = parseInt(daysAsString, 10) || undefined;
  if (days > 90) {
    days = 90;
  }
  return {
    category,
    query,
    location,
    days,
    page,
    pageSize,
    download,
    sort,
  };
}

export async function tweets(requestQuery, session) {
  const searchQuery = tweetsSearchQueryFromUserQuery(
    tweetsUserQuery(requestQuery),
  );
  const searchParams = tweetsSearchParamsFromSearchQuery(searchQuery);
  const url = `${BASE_URL}/tweets/?${searchParams.toString()}`;

  return fetchJson(url, session);
}

// Do not include page or pageSize in searchQuery
export async function tweetsInsights(requestQuery, session) {
  const { page, pageSize, ...requestQueryQuery } = requestQuery || {};
  const searchQuery = tweetsSearchQueryFromUserQuery(
    tweetsUserQuery(requestQueryQuery),
  );
  const searchParams = tweetsSearchParamsFromSearchQuery(searchQuery);
  const url = `${BASE_URL}/tweets/insights?${searchParams.toString()}`;
  return fetchJson(url, session);
}

export async function deleteSavedSearch(searchId, session) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetchJson(`${BASE_URL}/tweets/searches/${searchId}`, session, options);
}

export async function updateSavedSearch(searchId, payload, session) {
  const options = {
    method: "PUT",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchJson(`${BASE_URL}/tweets/searches/${searchId}`, session, options);
}

export async function getSavedSearches({ page, pageSize }, session) {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.append("page", page);
  }
  if (pageSize) {
    searchParams.append("page_size", pageSize);
  }

  const options = {
    method: "GET",
  };
  return fetchJson(
    `${BASE_URL}/tweets/searches?${searchParams.toString()}`,
    session,
    options,
  );
}

export async function postSavedSearch(payload, session) {
  const userQuery = JSON.parse(payload);
  const {
    query: queryTerm,
    location,
    days,
  } = tweetsSearchQueryFromUserQuery(userQuery);

  const d = days ?? 7;

  const date = new Date();
  const endDate = date.toISOString().substring(0, 10);
  const startDate = subDays(date, d).toISOString().substring(0, 10);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userQuery?.name,
      query: {
        term: queryTerm,
        endDate,
        location,
        startDate,
      },
    }),
  };

  return fetchJson(`${BASE_URL}/tweets/searches`, session, options);
}
