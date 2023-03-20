import { payload } from "@/charterafrica/lib";
import {
  getGlobalProps as getGlobalPropsFromCommon,
  getArticles,
  getTags,
  getPageProps,
} from "@/charterafrica/lib/data/common";

// Only used on home page
export async function getGlobalProps(context) {
  return getGlobalPropsFromCommon(context, payload);
}

export const api = payload;

export async function getServerSideArticles(collection, context) {
  return getArticles(collection, api, context);
}

export async function getServerSideTags(collection, context) {
  return getTags(collection, api, context);
}

export async function getPageServerSideProps(context) {
  const props = await getPageProps(api, context);

  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}
