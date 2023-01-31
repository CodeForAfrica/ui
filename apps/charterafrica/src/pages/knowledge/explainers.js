import Explainers from "@/charterafrica/components/Explainers";
import { payload } from "@/charterafrica/lib";
import getGlobalProps from "@/charterafrica/utils/getGlobalProps";

function Explainer(props) {
  return <Explainers {...props} />;
}

export async function getServerSideProps({ defaultLocale, locale, locales }) {
  const explainer = await payload.findPage("explainers", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const pages = explainer.docs;
  if (!pages?.length) {
    return { notFound: true };
  }

  const [page] = pages;
  const explainers = await payload.getExplainers();
  const globalProps = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  return {
    props: {
      ...globalProps,
      ...page,
      explainers: explainers.docs ?? null,
    },
  };
}

export default Explainer;
