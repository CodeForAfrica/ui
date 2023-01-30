import Explainers from "../components/Explainers";

import { payload } from "@/charterafrica/lib";
import getGlobalProps from "@/charterafrica/utils/getGlobalProps";

function Explainer({ blocks, title }) {
  const explainers = blocks?.map((block) => ({
    ...block,
  }));
  return <Explainers title={title} explainers={explainers} />;
}
export async function getStaticProps({ defaultLocale, locale, locales }) {
  const explainer = await payload.findPage("explainers", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const pages = explainer.docs;
  if (!pages?.length) {
    return { notFound: true };
  }
  const [page] = pages;

  const globalProps = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  return { props: { ...page, ...globalProps } };
}

export default Explainer;
