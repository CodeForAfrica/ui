import React from "react";

import ImpactCardList from "../components/ImpactCardList";

import FeaturedProjects from "@/codeforafrica/components/FeaturedProjects";
import Hero from "@/codeforafrica/components/Hero";
import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import OurPartners from "@/codeforafrica/components/OurPartners";
import OurTeam from "@/codeforafrica/components/OurTeam";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero": {
            return <Hero {...section} key={section.slug} />;
          }
          case "projects": {
            return <FeaturedProjects {...section} key={section.slug} />;
          }
          case "our-team": {
            return <OurTeam {...section} key={section.slug} />;
          }
          case "news-stories": {
            return <NewsAndStories {...section} key={section.slug} />;
          }
          case "our-partners": {
            return <OurPartners {...section} key={section.slug} />;
          }
          case "impact": {
            return <ImpactCardList {...section} />;
          }
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/" });
}

export default Index;
