import { getPageStaticProps } from "@/codeforafrica/lib";
import { getPageProps } from "@/codeforafrica/lib/data/common";
import { api } from "@/codeforafrica/lib/data/rest";

export async function getPageServerSideProps(context, slug) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  // TODO Remove static props
  const { props: staticProps } = await getPageStaticProps({ slug });
  return {
    props: {
      ...staticProps,
      ...props,
      blocks: [...staticProps.sections, ...(props?.blocks || [])],
    },
  };
}

export default { getPageServerSideProps };
