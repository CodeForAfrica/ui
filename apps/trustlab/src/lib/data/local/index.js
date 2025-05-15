import { getPageProps, getPagePaths } from "@/trustlab/lib/data/common";
import api from "@/trustlab/lib/payload";

export async function getPageStaticPaths() {
  return getPagePaths(api);
}

export async function getPageStaticProps(context) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  return {
    props,
    revalidate: 600,
  };
}
