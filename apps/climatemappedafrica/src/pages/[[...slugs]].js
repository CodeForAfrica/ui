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
import Error from "@/climatemappedafrica/components/Error";
import ExplorePage from "@/climatemappedafrica/components/ExplorePage";
import Footer from "@/climatemappedafrica/components/Footer";
import Hero from "@/climatemappedafrica/components/Hero";
import Navigation from "@/climatemappedafrica/components/Navigation";
import {
  getPageStaticPaths,
  getPageStaticProps,
} from "@/climatemappedafrica/lib/data";
import getFallbackData from "@/climatemappedafrica/lib/data/fallback";

const componentsBySlugs = {
  "data-indicators": DataIndicators,
  "data-visualisation-guide": DataVisualisationGuide,
  error: Error,
  "explore-page": ExplorePage,
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
    const { footer: footerProps, menus } = getFallbackData();
    return (
      <PageConfig {...pageConfigProps}>
        <Navigation {...menus} />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </Box>
        <Footer {...footerProps} />
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

// async function fetchWithRetry(context, attempt = 1, maxAttempts = 5) {
//   try {
//     const result = await getPageStaticProps(context);
//     return result;
//   } catch (error) {
//     if (attempt === maxAttempts) {
//       return {
//         props: {
//           blocks: [],
//           fallback: {},
//         },
//         revalidate: 60,
//       };
//     }
//     const timeout = Math.min(1000 * 2 ** attempt, 10000);
//     await new Promise((resolve) => {
//       setTimeout(resolve, timeout);
//     });
//     return fetchWithRetry(context, attempt + 1, maxAttempts);
//   }
// }

export async function getStaticPaths() {
  return getPageStaticPaths();
}

export async function getStaticProps(context) {
  return getPageStaticProps(context);
}

export default Page;
