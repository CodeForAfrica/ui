import { getPageStaticProps } from "@/codeforafrica/lib";
import { getPageProps } from "@/codeforafrica/lib/data/common";
import { api } from "@/codeforafrica/lib/data/rest";

function getPageSlug({ params }) {
  const slugsCount = params?.slugs?.length;
  // count < 3, page slug is the last slug e.g. ["about"] or ["knowldge/news"]
  // count == 3, page slug is the 2nd slug (index 1); last slug (index 3)
  //             is the post. e.g. opportunities/grants/democratic-governance-in-zambia
  const pageSlugIndex = slugsCount < 3 ? slugsCount - 1 : 1;
  return params?.slugs?.[pageSlugIndex] || "index";
}
export async function getPageServerSideProps(context) {
  const slug = getPageSlug(context);
  const pathname =
    slug !== "index" ? `/${context.params.slugs.join("/")}` : "/";
  const props = await getPageProps(api, slug);
  if (!props) {
    return { notFound: true };
  }
  // TODO Remove static props
  const { props: staticProps } = await getPageStaticProps({ slug: pathname });
  return {
    props: {
      ...staticProps,
      ...props,
      blocks: [...(props?.blocks || [])],
    },
  };
}

export default { getPageServerSideProps };
