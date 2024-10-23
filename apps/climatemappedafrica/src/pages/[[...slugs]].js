import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import React from "react";
import { SWRConfig } from "swr";

import AboutTeam from "@/climatemappedafrica/components/AboutTeam";
import ExplorePage from "@/climatemappedafrica/components/ExplorePage";
import Footer from "@/climatemappedafrica/components/Footer";
import Hero from "@/climatemappedafrica/components/Hero";
import HowItWorks from "@/climatemappedafrica/components/HowItWorks";
import Tutorial from "@/climatemappedafrica/components/HURUmap/Tutorial";
import Navigation from "@/climatemappedafrica/components/Navigation";
import PageHero from "@/climatemappedafrica/components/PageHero";
import Summary from "@/climatemappedafrica/components/Summary";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

const componentsBySlugs = {
  "explore-page": ExplorePage,
  hero: Hero,
  "how-it-works": HowItWorks,
  "page-hero": PageHero,
  summary: Summary,
  team: AboutTeam,
};

function Index({ blocks, menus, footer: footerProps, seo = {}, fallback }) {
  const {
    query: { showTutorial },
  } = useRouter();

  const pageSeo = {};
  pageSeo.title = seo?.title || null;
  pageSeo.description = seo?.metaDesc || null;
  pageSeo.canonical = seo?.canonical || null;
  if (seo?.opengraphType || seo?.opengraphImage) {
    pageSeo.openGraph = {};
    if (seo.opengraphImage) {
      pageSeo.openGraph.images = [
        {
          url: seo.opengraphImage,
          alt: seo.title || null,
        },
      ];
    }
    if (seo.opengraphType) {
      pageSeo.openGraph.type = seo.opengraphType;
    }
  }

  const tutorialBlock = blocks.find((block) => block.blockType === "tutorial");

  let TutorialComponent = React.Fragment;
  if (tutorialBlock) {
    TutorialComponent = Tutorial;
  }

  let PageConfig = React.Fragment;
  let pageConfigProps;
  if (fallback) {
    PageConfig = SWRConfig;
    pageConfigProps = { value: { fallback } };
  }
  return (
    <TutorialComponent
      key={showTutorial}
      {...tutorialBlock}
      defaultOpen={Number.parseInt(showTutorial, 10) === 1}
    >
      <Navigation {...menus} />
      <NextSeo
        {...pageSeo}
        nofollow={seo?.metaRobotsNofollow !== "follow"}
        noindex={seo?.metaRobotsNoindex !== "index"}
      />
      <PageConfig {...pageConfigProps}>
        {blocks.map((block) => {
          const Component = componentsBySlugs[block.blockType];
          if (!Component) {
            return null;
          }
          // Just in case a block appears twice on the same page, use id as key
          return <Component {...block} key={block.id} />;
        })}
      </PageConfig>
      <Footer {...footerProps} />
    </TutorialComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
