import React from "react";

import AboutPageHeader from "@/codeforafrica/components/AboutPageHeader";
import GetInTouch from "@/codeforafrica/components/GetInTouch";
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
          case "hero": {
            return <AboutPageHeader {...section} crumbs key={section.slug} />;
          }
          case "our-team": {
            return (
              <OurTeam
                {...section}
                sx={{
                  bgcolor: "background.default",
                  py: { xs: 2.5, md: 0 },
                }}
                key={section.slug}
              />
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
  return getPageStaticProps({ slug: "/about/members" });
}

export default Index;
