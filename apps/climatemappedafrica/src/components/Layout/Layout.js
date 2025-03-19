import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import React from "react";

import Footer from "@/climatemappedafrica/components/Footer";
import Tutorial from "@/climatemappedafrica/components/HURUmap/Tutorial";
import Navigation from "@/climatemappedafrica/components/Navigation";

function Layout({ children, menus, footer: footerProps, seo, blocks = [] }) {
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

  let TutorialComponent = React.Fragment;
  let TutorialComponentProps;
  const tutorialBlock = blocks.find((block) => block.blockType === "tutorial");

  if (tutorialBlock && tutorialBlock?.enabled) {
    TutorialComponent = Tutorial;
    TutorialComponentProps = {
      ...tutorialBlock,
      defaultOpen: Number.parseInt(showTutorial, 10) === 1,
    };
  }

  return (
    <>
      <NextSeo {...pageSeo} />
      <TutorialComponent key={showTutorial} {...TutorialComponentProps}>
        <Navigation {...menus} />
        {children}
        <Footer {...footerProps} />
      </TutorialComponent>
    </>
  );
}

export default Layout;
