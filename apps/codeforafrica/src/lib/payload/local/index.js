import api from "./payload";

import { getPageStaticProps } from "@/codeforafrica/lib";
import getPageProps from "@/codeforafrica/lib/payload/common";

export default async function getPageServerSideProps(context, slug) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  const { props: staticProps } = await getPageStaticProps({ slug });
  return {
    props: { ...staticProps, ...props },
  };
}
