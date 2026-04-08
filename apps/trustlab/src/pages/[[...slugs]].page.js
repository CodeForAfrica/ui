import dynamic from "next/dynamic";
import React from "react";
import { SWRConfig } from "swr";

import { getPageStaticProps } from "@/trustlab/lib/data";

const ActionBanner = dynamic(
  () => import("@/trustlab/components/ActionBanner"),
);
const Banner = dynamic(() => import("@/trustlab/components/Banner"));
const CallToAction = dynamic(
  () => import("@/trustlab/components/CallToAction"),
);
const CategoryList = dynamic(
  () => import("@/trustlab/components/CategoryList"),
);
const ComingSoon = dynamic(() => import("@/trustlab/components/ComingSoon"));
const Content = dynamic(() => import("@/trustlab/components/Content"));
const ContentActionBanner = dynamic(
  () => import("@/trustlab/components/ContentActionBanner"),
);
const ContentOverview = dynamic(
  () => import("@/trustlab/components/ContentOverview"),
);
const CourseList = dynamic(
  () => import("@/trustlab/components/CourseList/CourseList"),
);
const DonorOverviewList = dynamic(
  () => import("@/trustlab/components/DonorOverviewList"),
);
const ErrorPage = dynamic(() => import("@/trustlab/components/Error"));
const Facilitators = dynamic(
  () => import("@/trustlab/components/Facilitators"),
);
const FeatureList = dynamic(() => import("@/trustlab/components/FeatureList"));
const Gallery = dynamic(() => import("@/trustlab/components/Gallery/Gallery"));
const Helplines = dynamic(() => import("@/trustlab/components/Helplines"));
const Hero = dynamic(() => import("@/trustlab/components/Hero"));
const HighlightList = dynamic(
  () => import("@/trustlab/components/HighlightList"),
);
const HorizontalGallery = dynamic(
  () => import("@/trustlab/components/HorizontalGallery"),
);
const Incubator = dynamic(() => import("@/trustlab/components/Incubator"));
const IntelligenceBriefings = dynamic(
  () => import("@/trustlab/components/IntelligenceBriefings"),
);
const OpportunityList = dynamic(
  () => import("@/trustlab/components/OpportunityList"),
);
const OpportunityOverview = dynamic(
  () => import("@/trustlab/components/OpportunityOverview"),
);
const OverviewCardList = dynamic(
  () => import("@/trustlab/components/OverviewCardList"),
);
const PageOverview = dynamic(
  () => import("@/trustlab/components/PageOverview"),
);
const ParticipatingOrganizationList = dynamic(
  () => import("@/trustlab/components/ParticipatingOrganizationList"),
);
const PartnerOverviewList = dynamic(
  () => import("@/trustlab/components/PartnerOverviewList"),
);
const PartnersList = dynamic(
  () => import("@/trustlab/components/PartnersList"),
);
const PlaybooksList = dynamic(
  () => import("@/trustlab/components/PlaybooksList"),
);
const PostList = dynamic(() => import("@/trustlab/components/PostList"));
const ReportsList = dynamic(() => import("@/trustlab/components/ReportsList"));
const Resources = dynamic(() => import("@/trustlab/components/Resources"));
const Spotlight = dynamic(() => import("@/trustlab/components/Spotlight"));
const Testimonial = dynamic(() => import("@/trustlab/components/Testimonial"));
const ToolkitList = dynamic(() => import("@/trustlab/components/ToolkitList"));
const WhereWeWork = dynamic(() => import("@/trustlab/components/WhereWeWork"));

const componentsBySlugs = {
  "action-banner": ActionBanner,
  "call-to-action": CallToAction,
  content: Content,
  "course-list": CourseList,
  "donor-overview-list": DonorOverviewList,
  resources: Resources,
  "coming-soon": ComingSoon,
  error: ErrorPage,
  facilitators: Facilitators,
  gallery: Gallery,
  "horizontal-gallery": HorizontalGallery,
  "helplines-overview-list": OverviewCardList,
  hero: Hero,
  incubator: Incubator,
  "intelligence-briefings": IntelligenceBriefings,
  "opportunity-list": OpportunityList,
  "participating-organization-list": ParticipatingOrganizationList,
  "page-header": Banner,
  "page-overview": PageOverview,
  "partner-overview-list": PartnerOverviewList,
  "partners-list": PartnersList,
  "where-we-work": WhereWeWork,
  "post-list": PostList,
  helplines: Helplines,
  "resources-overview-list": OverviewCardList,
  spotlight: Spotlight,
  "what-we-do": Banner,
  "research-category": CategoryList,
  "resource-category": CategoryList,
  "opportunity-category": CategoryList,
  "reports-list": ReportsList,
  "toolkits-list": ToolkitList,
  "playbooks-list": PlaybooksList,
  "opportunity-overview": OpportunityOverview,
  testimonial: Testimonial,
  "highlight-list": HighlightList,
  "feature-list": FeatureList,
  "content-overview": ContentOverview,
  "content-action-banner": ContentActionBanner,
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

export async function getStaticPaths() {
  // Different environments will have different pages
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context) {
  return getPageStaticProps(context);
}

export default Page;
