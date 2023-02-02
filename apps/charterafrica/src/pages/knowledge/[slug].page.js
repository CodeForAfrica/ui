import Explainers from "@/charterafrica/components/Explainers";
import PageInfo from "@/charterafrica/components/PageInfo";
import ResearchComponent from "@/charterafrica/components/Research";
import { payload } from "@/charterafrica/lib";
import getGlobalProps from "@/charterafrica/utils/getGlobalProps";

function Explainer({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      case "explainers":
        return <Explainers {...block} key={block.slug} />;
      case "research":
        return <ResearchComponent {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps({
  defaultLocale,
  locale,
  locales,
  params: { slug },
}) {
  const lowerCasedSlug = slug?.toLowerCase();
  const explainer = await payload.findPage(lowerCasedSlug, {
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
  const researchBlock = {
    slug: "research",
    title: "Research",
    research: Array(30)
      .fill()
      .map(() => ({
        title: "Research title goes here and spans over second line",
        author: "Sakwa G",
        date: "2023-02-11",
        id: Math.random(),
        image: {
          id: "63d2622aafe25f6469605eae",
          alt: "European Union",
          prefix: "media",
          filename: "image 9.png",
          mimeType: "image/png",
          filesize: 257010,
          width: 1236,
          height: 696,
          createdAt: "2023-01-26T11:21:14.868Z",
          updatedAt: "2023-01-26T11:21:14.868Z",
          url: "http://localhost:3000/media/Rectangle 113.png",
        },
      })),
  };

  const collection = await payload.getCollection("explainers");
  const explainers = collection?.docs || null;
  const explainerBlock = {
    slug: "explainers",
    title: page.title,
    explainers,
  };

  switch (lowerCasedSlug) {
    case "explainers":
      blocks.push(explainerBlock);
      break;
    case "research":
      blocks.push(researchBlock);
      break;
    default:
      return { notFound: true };
  }

  const globalProps = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  return {
    props: {
      blocks,
      ...globalProps,
    },
  };
}

export default Explainer;
