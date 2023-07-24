import { getPageStaticProps, payload } from "@/codeforafrica/lib";
import { getPageProps } from "@/codeforafrica/lib/data/common";

export async function getPageServerSideProps(context, slug) {
  const props = await getPageProps(payload, context);
  if (!props) {
    return { notFound: true };
  }
  // TODO Remove static props
  const { props: staticProps } = await getPageStaticProps({ slug });
  return {
    props: { ...staticProps, ...props },
  };
}

export default { getPageServerSideProps };
