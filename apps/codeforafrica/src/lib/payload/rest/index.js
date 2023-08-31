import { api } from "./payload";

import { getPageStaticProps as getStaticProps } from "@/codeforafrica/lib";
import getPageProps from "@/codeforafrica/lib/payload/common";

export default async function getPageStaticProps(context, slug) {
  const props = await getPageProps(api, context);
  const { props: staticProps } = await getStaticProps({ slug });
  return {
    props: { ...staticProps, ...props },
  };
}
