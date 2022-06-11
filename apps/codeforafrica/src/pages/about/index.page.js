import React from "react";

import GuidingPrinciplesList from "@/codeforafrica/components/GuidingPrinciplesList";
import ImpactCardList from "@/codeforafrica/components/ImpactCardList";
import OurPartners from "@/codeforafrica/components/OurPartners";
import OurTeam from "@/codeforafrica/components/OurTeam";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "our-partners": {
            return <OurPartners {...section} key={section.slug} />;
          }
          case "impact": {
            return <ImpactCardList {...section} key={section.slug} />;
          }
          case "guiding-principles": {
            return <GuidingPrinciplesList {...section} key={section.slug} />;
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
