import fetchJson from "@/codeforafrica/utils/fetchJson";

const BASE_URL = process.env.PAYLOAD_PUBLIC_APP_URL || "http://localhost:3000";

const SUPPORTED_OPTIONS = {
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

// eslint-disable-next-line import/prefer-default-export
export const api = {
  findCollection,
  findGlobal,
  findPage,
};
