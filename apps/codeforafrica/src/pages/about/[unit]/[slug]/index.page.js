import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import AboutChildPageHeader from "@/codeforafrica/components/AboutChildPageHeader";
import Page from "@/codeforafrica/components/Page";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import SectionDivider from "@/codeforafrica/components/SectionDivider";
import ShareThisPage from "@/codeforafrica/components/ShareThisPage";
import { getPageStaticProps, partners, team } from "@/codeforafrica/lib";

function Index({ member, partner, sections, ...props }) {
  const item = member || partner;

  return (
    <Page {...props}>
      <AboutChildPageHeader
        {...item}
        FigureProps={{
          ...(partner && {
            sx: {
              backgroundPositionY: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              bgcolor: "background.default",
              borderRadius: 0,
              filter: "drop-shadow(0px 8.7px 17.4px rgba(0, 0, 0, 0.1))",
              height: { xs: 116 },
              width: { xs: 247 },
            },
          }),
        }}
      />
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
          {item?.content}
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
  const partnersPaths = partners.map(({ slug }) => ({
    params: { unit: "partners", slug },
  }));
  const teamPaths = team.map(({ slug }) => ({
    params: { unit: "members", slug },
  }));

  return {
    paths: [...partnersPaths, ...teamPaths],
    fallback: false,
  };
}

export async function getStaticProps({ params: { unit, slug } }) {
  return getPageStaticProps({ slug: `/about/${unit}/${slug}` });
}

export default Index;
