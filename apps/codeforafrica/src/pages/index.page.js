import { Section } from "@commons-ui/core";
import React from "react";

import FeaturedProjects from "@/codeforafrica/components/FeaturedProjects";
import Hero from "@/codeforafrica/components/Hero";
import ImpactCard from "@/codeforafrica/components/ImpactCard";
import MeetOurTeam from "@/codeforafrica/components/MeetOurTeam";
import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import OurPartners from "@/codeforafrica/components/OurPartners";
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
          case "meet-our-team": {
            return <MeetOurTeam {...section} key={section.slug} />;
          }
          case "news-stories": {
            return <NewsAndStories {...section} key={section.slug} />;
          }
          case "our-partners": {
            return <OurPartners {...section} key={section.slug} />;
          }
          case "impact": {
            return (
              <Section
                sx={{
                  backgroundColor: "background.main",
                }}
                key={section.slug}
              >
                <ImpactCard {...section} />
              </Section>
            );
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
