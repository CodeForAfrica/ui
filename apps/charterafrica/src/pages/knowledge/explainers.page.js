import Explainers from "@/charterafrica/components/Explainers";
import PageInfo from "@/charterafrica/components/PageInfo";
import { payload } from "@/charterafrica/lib";
import getGlobalProps from "@/charterafrica/utils/getGlobalProps";

function Explainer({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      case "explainers":
        return <Explainers {...block} key={block.slug} />;
      default:
        return null;
    }
  });
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
  const blocks =
    page.blocks?.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    })) ?? [];
  const collection = await payload.getCollection("explainers");
  const explainers = collection.docs || null;
  blocks.push({
    slug: "explainers",
    title: page.title,
    explainers,
  });
  const globalProps = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  return {
    props: {
      blocks,
      ...globalProps,
      explainers: explainers.docs ?? null,
    },
  };
}

export default Explainer;
