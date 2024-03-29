import { getPageProps } from "@/charterafrica/lib/data/common";
import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_URL = process.env.PAYLOAD_PUBLIC_APP_URL;

const SUPPORTED_OPTIONS = {
  locale: "locale",
  fallbackLocale: "fallback-locale",
  where: "where",
};

function optionsToParams(options) {
  const params = Object.keys(SUPPORTED_OPTIONS).reduce((acc, curr) => {
    const optionValue = options?.[curr];
    if (optionValue) {
      acc[SUPPORTED_OPTIONS[curr]] = optionValue;
    }
    return acc;
  }, {});
  return params;
}

const findGlobal = async (slug, options) => {
  const params = optionsToParams(options);
  return fetchJson.get(`${BASE_URL}/api/globals/${slug}`, {
    params,
  });
};

const findCollection = async (slug, options) => {
  const params = optionsToParams(options);
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

export async function getPageStaticProps(context) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}
