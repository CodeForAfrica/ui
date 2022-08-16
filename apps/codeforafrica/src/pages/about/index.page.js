import React from "react";

import AboutPageHeader from "@/codeforafrica/components/AboutPageHeader";
import GetInTouch from "@/codeforafrica/components/GetInTouch";
import GuidingPrinciplesCardList from "@/codeforafrica/components/GuidingPrinciplesCardList";
import OurImpact from "@/codeforafrica/components/OurImpact";
import OurMission from "@/codeforafrica/components/OurMission";
import OurPartners from "@/codeforafrica/components/OurPartners";
import OurTeam from "@/codeforafrica/components/OurTeam";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "get-in-touch": {
            return <GetInTouch {...section} key={section.slug} />;
          }
          case "guiding-principles": {
            return (
              <GuidingPrinciplesCardList
                {...section}
                sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5, md: 10 } }}
                key={section.slug}
              />
            );
          }
          case "hero": {
            return <AboutPageHeader {...section} key={section.slug} />;
          }
          case "our-impact": {
            return <OurImpact {...section} key={section.slug} />;
          }
          case "our-mission": {
            return (
              <OurMission
                {...section}
                sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5, md: 10 } }}
                key={section.slug}
              />
            );
          }
          case "our-partners": {
            return <OurPartners {...section} key={section.slug} />;
          }
          case "our-team": {
            return <OurTeam {...section} key={section.slug} />;
          }
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/about" });
}

export default Index;
