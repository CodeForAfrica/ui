import React from "react";
import { SWRConfig } from "swr";

import Articles from "@/charterafrica/components/Articles";
import CommunityPlatforms from "@/charterafrica/components/CommunityPlatforms";
import Consultations from "@/charterafrica/components/Consultations";
import DocumentList from "@/charterafrica/components/DocumentList";
import Ecosystem from "@/charterafrica/components/Ecosystem";
import EmbeddedDocumentViewer from "@/charterafrica/components/EmbeddedDocumentViewer";
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
import Opportunity from "@/charterafrica/components/Opportunity";
import OpportunityHeader from "@/charterafrica/components/OpportunityHeader";
import OpportunityPage from "@/charterafrica/components/OpportunityPage";
import PageDescription from "@/charterafrica/components/PageDescription";
import PageHeader from "@/charterafrica/components/PageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import Partners from "@/charterafrica/components/Partners";
import Post from "@/charterafrica/components/Post";
import Resources from "@/charterafrica/components/Resources";
import Spotlight from "@/charterafrica/components/Spotlight";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

const componentsBySlugs = {
  consultations: Consultations,
  "our-community-platforms": CommunityPlatforms,
  documents: DocumentList,
  ecosystem: Ecosystem,
  explainers: Explainers,
  faq: FAQ,
  "featured-post": FeaturedPostCard,
  "fellowships-and-grants-header": OpportunityHeader,
  "focal-countries": FocalCountries,
  "guiding-principles": GuidingPrinciples,
  helpdesk: Helpdesk,
  "helpdesk-page-content": HelpdeskPageContent,
  hero: Hero,
  impressum: Impressum,
  longform: LongForm,
  mooc: Mooc,
  news: Articles,
  opportunity: Opportunity,
  opportunities: OpportunityPage,
  "our-grantees": Grantees,
  "our-partners": Partners,
  "our-resources": Resources,
  "page-description": PageDescription,
  "page-header": PageHeader,
  "page-info": PageInfo,
  post: Post,
  research: Articles,
  "embedded-document-viewer": EmbeddedDocumentViewer,
  spotlight: Spotlight,
};

function Page({ blocks, fallback }) {
  if (!blocks?.length) {
    return null;
  }
  let PageComponent = React.Fragment;
  let pageComponentProps;
  if (fallback) {
    PageComponent = SWRConfig;
    pageComponentProps = { value: { fallback } };
  }
  return (
    <PageComponent {...pageComponentProps}>
      {blocks.map((block) => {
        const Component = componentsBySlugs[block.slug];
        if (!Component) {
          return null;
        }
        return <Component {...block} key={block.id} />;
      })}
    </PageComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Page;
