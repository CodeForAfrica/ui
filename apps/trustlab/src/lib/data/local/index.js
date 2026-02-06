import { getPageProps, getPagePaths } from "@/trustlab/lib/data/common";
import { processRobotsTxtContent } from "@/trustlab/lib/data/common/seo";
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

export async function getServerSideProps(context) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}

export async function getRobotsTxtContent() {
  const siteSettings = await api.findGlobal("site-settings");
  return processRobotsTxtContent(siteSettings?.robotsTxt);
}

export default undefined;
