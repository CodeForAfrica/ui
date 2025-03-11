import {
  getPagePaths,
  getPageProps,
} from "@/climatemappedafrica/lib/data/common";
import payload from "@/climatemappedafrica/lib/payload";

export const api = payload;

export async function getPageStaticPaths() {
  return getPagePaths(api);
}

export async function getPageStaticProps(context) {
  const props = await getPageProps(api, context);

  // TODO(kilemensi): We need to differentiate 404 from server errors (5xx)
  //                  https://nextjs.org/docs/14/pages/building-your-application/data-fetching/incremental-static-regeneration#error-handling-and-revalidation
  if (!props) {
    return { notFound: true };
  }
  return {
    props,
    revalidate: 600,
  };
}
