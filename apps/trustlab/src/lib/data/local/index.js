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

export async function getServerSideProps(context) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  const { res } = context;
  const slug = context.params?.slugs?.join("/") || "index";

  if (slug === "robots.txt" && props.robotsTxt) {
    const content = props.robotsTxt;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write(content.endsWith("\n") ? content : `${content}\n`);
    res.end();

    return { props: {} };
  }
  return {
    props,
  };
}

export default undefined;
