import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import AboutMemberPageHeader from "@/codeforafrica/components/AboutMemberPageHeader";
import Page from "@/codeforafrica/components/Page";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import SectionDivider from "@/codeforafrica/components/SectionDivider";
import ShareThisPage from "@/codeforafrica/components/ShareThisPage";
import { team, getPageStaticProps } from "@/codeforafrica/lib";

function Index({ member, sections, ...props }) {
  return (
    <Page {...props}>
      <AboutMemberPageHeader {...member} />
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          pt: { xs: 2.5, md: 7 },
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
        }}
      >
        <RichTypography
          variant="body1"
          sx={{
            mb: 5,
            typography: "subheading",
          }}
        >
          {member?.description}
        </RichTypography>
        <ShareThisPage
          spacing="17px"
          title="Connect"
          sx={{
            color: "text.primary",
          }}
        />
      </Section>
      {sections?.map((section) => {
        switch (section.slug) {
          case "related-projects":
            return (
              <React.Fragment key={section.slug}>
                <SectionDivider
                  sx={{
                    maxWidth: {
                      sm: "648px",
                      md: "912px",
                    },
                    px: { xs: 2.5, sm: 0 },
                    py: { xs: "30px", md: 5 },
                  }}
                />
                <RelatedProjects
                  sx={{
                    maxWidth: {
                      sm: "648px",
                      md: "912px",
                    },
                    pb: { xs: 10, md: 7 },
                    pt: 0,
                  }}
                  tileListProps={{ fixed: true }}
                  titleProps={{ sx: { mb: { xs: "30px", md: 5 } } }}
                  {...section}
                />
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = team.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/about/members/${slug}` });
}

export default Index;
