import { getPageStaticProps as getStaticProps } from "@/codeforafrica/lib";
import { getPageProps } from "@/codeforafrica/lib/data/common";
import fetchJson from "@/codeforafrica/utils/fetchJson";

const BASE_URL = process.env.PAYLOAD_PUBLIC_APP_URL || "http://localhost:3000";

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

export async function getPageStaticProps(context, slug) {
  const props = await getPageProps(api, slug);
  // TODO(koechkevin): Remove this
  const { props: staticProps } = await getStaticProps({ slug });
  return {
    props: { ...staticProps, ...props },
  };
}
