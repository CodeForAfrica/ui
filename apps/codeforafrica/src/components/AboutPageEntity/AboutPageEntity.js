import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import AboutChildPageHeader from "@/codeforafrica/components/AboutChildPageHeader";
import ConnectBar from "@/codeforafrica/components/ConnectBar";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import RichText from "@/codeforafrica/components/RichText";
import SectionDivider from "@/codeforafrica/components/SectionDivider";

const Page = React.forwardRef(function Page(
  { description, connect, relatedProjects, name, logo, user, title },
  ref,
) {
  return (
    <Box ref={ref} sx={{ pb: { xs: 10, md: 7 } }}>
      <AboutChildPageHeader
        name={name}
        image={logo}
        title={title}
        FigureProps={{
          ...(!user && {
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
        <RichText
          typographyProps={{
            component: "p",
            variant: "subheading",
          }}
          sx={{
            mb: 5,
            typography: "subheading",
            "& > p": {
              mb: 5,
            },
          }}
          elements={description}
        />

        <ConnectBar title="Connect" links={connect} />
      </Section>
      {relatedProjects?.list?.length ? (
        <>
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
              pt: 0,
            }}
            tileListProps={{ fixed: true }}
            titleProps={{ sx: { mb: { xs: "30px", md: 5 } } }}
            title={relatedProjects.title}
            projects={relatedProjects?.list}
          />
        </>
      ) : null}
    </Box>
  );
});

export default Page;
