import Articles from "@/charterafrica/components/Articles";
import CommunityPlatforms from "@/charterafrica/components/CommunityPlatforms";
import Ecosystem from "@/charterafrica/components/Ecosystem";
import Explainers from "@/charterafrica/components/Explainers";
import FAQ from "@/charterafrica/components/FAQ";
import FeaturedPostCard from "@/charterafrica/components/FeaturedPostCard";
import FocalCountries from "@/charterafrica/components/FocalCountries";
import Grantees from "@/charterafrica/components/Grantees";
import GrantsAndFellowships from "@/charterafrica/components/GrantsAndFellowships";
import GrantsFellowshipsHeader from "@/charterafrica/components/GrantsFellowshipsHeader";
import GuidingPrinciples from "@/charterafrica/components/GuidingPrinciples";
import Helpdesk from "@/charterafrica/components/Helpdesk";
import HelpdeskPageContent from "@/charterafrica/components/HelpdeskPageContent";
import Hero from "@/charterafrica/components/Hero";
import Impressum from "@/charterafrica/components/Impressum";
import Mooc from "@/charterafrica/components/Mooc";
import PageDescription from "@/charterafrica/components/PageDescription";
import PageHeader from "@/charterafrica/components/PageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import Partners from "@/charterafrica/components/Partners";
import Resources from "@/charterafrica/components/Resources";
import Spotlight from "@/charterafrica/components/Spotlight";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

function Page({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "ecosystem":
        return <Ecosystem {...block} key={block.slug} />;
      case "explainers":
        return <Explainers {...block} key={block.slug} />;
      case "faq":
        return <FAQ {...block} key={block.slug} />;
      case "featured-post":
        return <FeaturedPostCard {...block} key={block.slug} />;
      case "focal-countries":
        return <FocalCountries {...block} key={block.slug} />;
      case "grantees":
        return <Grantees {...block} key={block.slug} />;
      case "guiding-principles":
        return <GuidingPrinciples {...block} key={block.slug} />;
      case "helpdesk":
        return <Helpdesk {...block} key={block.slug} />;
      case "helpdesk-page-content":
        return <HelpdeskPageContent {...block} key={block.slug} />;
      case "hero":
        return <Hero {...block} key={block.slug} />;
      case "impressum":
        return <Impressum {...block} key={block.slug} />;
      case "mooc":
        return <Mooc {...block} key={block.slug} />;
      case "news":
        return <Articles {...block} key={block.slug} />;
      case "our-community-platforms":
        return <CommunityPlatforms {...block} key={block.slug} />;
      case "our-partners":
        return <Partners {...block} key={block.slug} />;
      case "our-resources":
        return <Resources {...block} key={block.slug} />;
      case "page-description":
        return <PageDescription {...block} key={block.slug} />;
      case "page-header":
        return <PageHeader {...block} key={block.slug} />;
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
      case "spotlight":
        return <Spotlight {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Page;
