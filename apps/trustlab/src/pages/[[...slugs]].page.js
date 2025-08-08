import React from "react";
import { SWRConfig } from "swr";

import ActionBanner from "@/trustlab/components/ActionBanner";
import Banner from "@/trustlab/components/Banner";
import CallToAction from "@/trustlab/components/CallToAction";
import Content from "@/trustlab/components/Content";
import CourseList from "@/trustlab/components/CourseList/CourseList";
import DonorOverviewList from "@/trustlab/components/DonorOverviewList";
import FreeResources from "@/trustlab/components/FreeResources";
import Gallery from "@/trustlab/components/Gallery/Gallery";
import Hero from "@/trustlab/components/Hero";
import Incubator from "@/trustlab/components/Incubator";
import IntelligenceBriefings from "@/trustlab/components/IntelligenceBriefings";
import OverviewCardList from "@/trustlab/components/OverviewCardList";
import PageOverview from "@/trustlab/components/PageOverview";
import PartnerOverviewList from "@/trustlab/components/PartnerOverviewList";
import PartnersList from "@/trustlab/components/PartnersList";
import PostList from "@/trustlab/components/PostList";
import RapidResponse from "@/trustlab/components/RapidResponse";
import Spotlight from "@/trustlab/components/Spotlight";
import { getPageStaticPaths, getPageStaticProps } from "@/trustlab/lib/data";

const componentsBySlugs = {
  "action-banner": ActionBanner,
  "call-to-action": CallToAction,
  content: Content,
  "course-list": CourseList,
  "donor-overview-list": DonorOverviewList,
  gallery: Gallery,
  "helplines-overview-list": OverviewCardList,
  hero: Hero,
  incubator: Incubator,
  "page-header": Banner,
  "page-overview": PageOverview,
  "partner-overview-list": PartnerOverviewList,
  "partners-list": PartnersList,
  "post-list": PostList,
  "resources-overview-list": OverviewCardList,
  spotlight: Spotlight,
  "what-we-do": Banner,
};

const testSection = (
  <>
    <RapidResponse
      title="Rapid Response"
      briefs={[
        {
          icon: {
            url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
            alt: "Rapid Response icon",
          },
          title: "Rapid Response Briefing",
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders.",
                      type: "text",
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "paragraph",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            },
          },
        },
        {
          icon: {
            url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
            alt: "Rapid Response icon",
          },
          title: "Rapid Response Briefing",
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders.",
                      type: "text",
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "paragraph",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            },
          },
        },
        {
          icon: {
            url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
            alt: "Rapid Response icon",
          },
          title: "Rapid Response Briefing",
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders.",
                      type: "text",
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "paragraph",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            },
          },
        },
      ]}
    />
    <FreeResources
      title="Free Resources"
      resources={[
        {
          title: "RiskDetection toolkit",
          description: "This is a description of the resource.",
          image: {
            src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
            alt: "Resource Image",
          },
        },
        {
          title: "Roboshield toolkit",
          description: "This is a description of the resource.",
          image: {
            src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
            alt: "Resource Image",
          },
        },
        {
          title: "SelfDefence software",
          description: "This is a description of the resource.",
          image: {
            src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
            alt: "Resource Image",
          },
        },
        {
          title: "PolicyForge toolkit",
          description: "This is a description of the resource.",
          image: {
            src: "/api/media/file/screenshot-2025-07-21-at-13642-pm-1.png",
            alt: "Resource Image",
          },
        },
      ]}
    />
    <IntelligenceBriefings
      title="Intelligence briefings"
      subtitle="Stakeholder round table to strengthen grass roots defenders"
      description={{
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
              textFormat: 0,
              textStyle: "",
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      }}
      ctaItems={[
        {
          icon: {
            url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
            alt: "Fact-checking icon",
          },
          title: "Expert Analysis",
        },
        {
          icon: {
            url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
            alt: "Fact-checking icon",
          },
          title: "Share Evidence",
        },
        {
          icon: {
            url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
            alt: "Fact-checking icon",
          },
          title: "Brainstorm Solutions",
        },
      ]}
    />
  </>
);

function Page({ blocks, fallback }) {
  // if (!blocks?.length) {
  //   return null;
  // }

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
      {testSection}
    </PageComponent>
  );
}

export async function getStaticPaths() {
  return getPageStaticPaths();
}

export async function getStaticProps(context) {
  return getPageStaticProps(context);
}

export default Page;
