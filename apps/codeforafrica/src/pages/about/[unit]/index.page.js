import React from "react";

import AboutPageHeader from "@/codeforafrica/components/AboutPageHeader";
import GetInTouch from "@/codeforafrica/components/GetInTouch";
import OurPartners from "@/codeforafrica/components/OurPartners";
import OurTeam from "@/codeforafrica/components/OurTeam";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ crumbs, sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "get-in-touch": {
            return <GetInTouch {...section} key={section.slug} />;
          }
          case "hero": {
            return (
              <AboutPageHeader
                {...section}
                crumbs={crumbs}
                key={section.slug}
              />
            );
          }
          case "our-partners": {
            return <OurPartners {...section} key={section.slug} />;
          }
          case "our-team": {
            return (
              <OurTeam
                {...section}
                sx={{
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

export async function getStaticPaths() {
  const paths = ["members", "partners"].map((unit) => ({
    params: { unit },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { unit } }) {
  return getPageStaticProps({ slug: `/about/${unit}` });
}

export default Index;
