import { payload } from "@/charterafrica/lib";
import {
  getGlobalProps as getGlobalPropsFromCommon,
  getPageProps,
} from "@/charterafrica/lib/data/common";
import {
  getArticles,
  getTags,
} from "@/charterafrica/lib/data/common/processPageArticles";

// Only used on home page
export async function getGlobalProps(context) {
  return getGlobalPropsFromCommon(context, payload);
}

export const api = payload;

export async function getServerSideArticles(page, context) {
  return getArticles(page, api, context);
}

export async function getServerSideTags(page, context) {
  return getTags(page, api, context);
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
