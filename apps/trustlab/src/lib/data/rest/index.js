import { getErrorPageProps as getProps } from "@/trustlab/lib/data/common";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
export const fetchJson = {
  get: async (url, { params } = {}) => {
    // Build query string from params object
    const qs = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");

    const queryString = qs ? `?${qs}` : "";
    const response = await fetch(url + queryString, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  },
};

const findGlobal = async (slug, params) => {
  return fetchJson.get(`${BASE_URL}/api/globals/${slug}`, {
    params,
  });
};

const findCollection = async (slug, params) => {
  return fetchJson.get(`${BASE_URL}/api/${slug}`, {
    params,
  });
};

const findPage = async (slug, options) => {
  const pageOptions = {
    ...options,
    where: {
      ...options?.where,
      slug: {
        equals: slug,
      },
    },
  };
  return findCollection("pages", pageOptions);
};
export const api = {
  findCollection,
  findGlobal,
  findPage,
};

export async function getErrorPageProps(context) {
  const slug = context?.params?.slugs?.[0] || "404";
  const props = await getProps(api, slug);
  return {
    props,
  };
}
