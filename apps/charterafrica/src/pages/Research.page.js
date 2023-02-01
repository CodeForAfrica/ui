import PageInfo from "@/charterafrica/components/PageInfo";
import ResearchComponent from "@/charterafrica/components/Research";
import getGlobalProps from "@/charterafrica/utils/getGlobalProps";

function Research({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      case "research":
        return <ResearchComponent {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps({ defaultLocale, locale, locales }) {
  const globalProps = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  const blocks = [
    {
      slug: "research",
      research: Array(30).fill({
        title: "Research title goes here and spans over second line",
        author: "Sakwa G",
        date: "2023-02-11",
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
      }),
    },
  ];
  return {
    props: {
      ...globalProps,
      blocks,
    },
  };
}
export default Research;
