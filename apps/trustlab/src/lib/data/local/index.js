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
    revalidate: 60,
  };
}

export async function getRobotsTxt() {
  const siteSettings = await api.findGlobal("site-settings");
  return siteSettings?.robotsTxt;
}

export default undefined;
