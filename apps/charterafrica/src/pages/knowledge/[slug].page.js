import Articles from "@/charterafrica/components/Articles";
import Explainers from "@/charterafrica/components/Explainers";
import FeaturedPostCard from "@/charterafrica/components/FeaturedPostCard";
import PageInfo from "@/charterafrica/components/PageInfo";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

function Knowledge({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "featured-post":
        return <FeaturedPostCard {...block} key={block.slug} />;
      case "explainers":
        return <Explainers {...block} key={block.slug} />;
      case "news":
        return <Articles {...block} key={block.slug} />;
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      case "research":
        return <Articles {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Knowledge;
