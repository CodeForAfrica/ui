import { Loading } from "@hurumap/core";
import {
  AboutTeam,
  DataVisualisationGuide,
  HowItWorks,
  PageHero,
  Summary,
} from "@hurumap/next";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { SWRConfig } from "swr";

import DataIndicators from "@/climatemappedafrica/components/DataIndicators";
import ExplorePage from "@/climatemappedafrica/components/ExplorePage";
import ExplorePageError from "@/climatemappedafrica/components/ExplorePageError";
import Hero from "@/climatemappedafrica/components/Hero";
import {
  getPageStaticPaths,
  getPageStaticProps,
} from "@/climatemappedafrica/lib/data";

const componentsBySlugs = {
  "data-indicators": DataIndicators,
  "data-visualisation-guide": DataVisualisationGuide,
  "explore-page": ExplorePage,
  "explore-page-error": ExplorePageError,
  hero: Hero,
  "how-it-works": HowItWorks,
  "page-hero": PageHero,
  summary: Summary,
  team: AboutTeam,
};

function Page({ blocks = [], fallback }) {
  const { isFallback } = useRouter();

  let PageConfig = React.Fragment;
  let pageConfigProps;
  if (fallback) {
    PageConfig = SWRConfig;
    pageConfigProps = { value: { fallback } };
  }

  if (isFallback) {
    return (
      <PageConfig {...pageConfigProps}>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </Box>
      </PageConfig>
    );
  }

  return (
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
  );
}

export async function getStaticPaths() {
  return getPageStaticPaths();
}

export async function getStaticProps(context) {
  return getPageStaticProps(context);
}

export default Page;
