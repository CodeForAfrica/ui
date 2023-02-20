import Articles from "@/charterafrica/components/Articles";
import Explainers from "@/charterafrica/components/Explainers";
import FeaturedPostCard from "@/charterafrica/components/FeaturedPostCard";
import Grantees from "@/charterafrica/components/Grantees/Grantees";
import GrantsAndFellowships from "@/charterafrica/components/GrantsAndFellowships";
import GrantsFellowshipsHeader from "@/charterafrica/components/GrantsFellowshipsHeader";
import HelpdeskPageContent from "@/charterafrica/components/HelpdeskPageContent";
import HelpdeskPageHeader from "@/charterafrica/components/HelpdeskPageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

function About({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "explainers":
        return <Explainers {...block} key={block.slug} />;
      case "featured-post":
        return <FeaturedPostCard {...block} key={block.slug} />;
      case "grantees":
        return <Grantees {...block} key={block.slug} />;
      case "helpdesk-page-content":
        return <HelpdeskPageContent {...block} key={block.slug} />;
      case "helpdesk-page-header":
        return <HelpdeskPageHeader {...block} key={block.slug} />;
      case "news":
        return <Articles {...block} key={block.slug} />;
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      case "research":
        return <Articles {...block} key={block.slug} />;
      case "fellowships-and-grants-header":
        return <GrantsFellowshipsHeader {...block} key={block.slug} />;
      case "grants":
        return <GrantsAndFellowships {...block} key={block.slug} />;
      case "fellowships":
        return <GrantsAndFellowships {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default About;
