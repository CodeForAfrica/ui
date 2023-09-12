import { Section } from "@commons-ui/core";
import React from "react";

import AboutChildPageHeader from "@/codeforafrica/components/AboutChildPageHeader";
import ConnectBar from "@/codeforafrica/components/ConnectBar";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import RichText from "@/codeforafrica/components/RichText";
import SectionDivider from "@/codeforafrica/components/SectionDivider";

const SinglePartner = React.forwardRef(function SinglePartner({
  description,
  connect,
  relatedProjects,
  relatedProjectsTitle,
}) {
  return (
    <>
      <AboutChildPageHeader
        FigureProps={{
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
          variant="body1"
          sx={{
            mb: 5,
            typography: "subheading",
          }}
          elements={description}
        />

        <ConnectBar title="Connect" links={connect} />
      </Section>
      {relatedProjects.length ? (
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
              pb: { xs: 10, md: 7 },
              pt: 0,
            }}
            tileListProps={{ fixed: true }}
            titleProps={{ sx: { mb: { xs: "30px", md: 5 } } }}
            title={relatedProjectsTitle}
            projects={relatedProjects}
          />
        </>
      ) : null}
    </>
  );
});

export default SinglePartner;
