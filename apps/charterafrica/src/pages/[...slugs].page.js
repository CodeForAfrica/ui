import Articles from "@/charterafrica/components/Articles";
import ArticlesFilter from "@/charterafrica/components/ArticlesFilter";
import CommunityPlatforms from "@/charterafrica/components/CommunityPlatforms";
import Ecosystem from "@/charterafrica/components/Ecosystem";
import Explainers from "@/charterafrica/components/Explainers";
import FAQ from "@/charterafrica/components/FAQ";
import FeaturedPostCard from "@/charterafrica/components/FeaturedPostCard";
import FocalCountries from "@/charterafrica/components/FocalCountries";
import Grantees from "@/charterafrica/components/Grantees";
import GuidingPrinciples from "@/charterafrica/components/GuidingPrinciples";
import Helpdesk from "@/charterafrica/components/Helpdesk";
import HelpdeskPageContent from "@/charterafrica/components/HelpdeskPageContent";
import Hero from "@/charterafrica/components/Hero";
import Impressum from "@/charterafrica/components/Impressum";
import LongForm from "@/charterafrica/components/LongForm";
import Mooc from "@/charterafrica/components/Mooc";
import OpportunityHeader from "@/charterafrica/components/OpportunityHeader";
import OpportunityPage from "@/charterafrica/components/OpportunityPage";
import PageDescription from "@/charterafrica/components/PageDescription";
import PageHeader from "@/charterafrica/components/PageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import Partners from "@/charterafrica/components/Partners";
import Resources from "@/charterafrica/components/Resources";
import Spotlight from "@/charterafrica/components/Spotlight";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

const componentsBySlugs = {
  "article-filter": ArticlesFilter,
  "our-community-platforms": CommunityPlatforms,
  ecosystem: Ecosystem,
  events: OpportunityPage,
  explainers: Explainers,
  faq: FAQ,
  "featured-post": FeaturedPostCard,
  fellowships: OpportunityPage,
  "fellowships-and-grants-header": OpportunityHeader,
  "focal-countries": FocalCountries,
  grantees: Grantees,
  grants: OpportunityPage,
  "guiding-principles": GuidingPrinciples,
  helpdesk: Helpdesk,
  "helpdesk-page-content": HelpdeskPageContent,
  hero: Hero,
  impressum: Impressum,
  longform: LongForm,
  mooc: Mooc,
  news: Articles,
  "our-partners": Partners,
  "our-resources": Resources,
  "page-description": PageDescription,
  "page-header": PageHeader,
  "page-info": PageInfo,
  research: Articles,
  spotlight: Spotlight,
};

function Page({ blocks }) {
  return blocks?.map((block) => {
    const Component = componentsBySlugs[block.slug];
    if (!Component) {
      return null;
    }
    return <Component key={block.slug} {...block} />;
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Page;
