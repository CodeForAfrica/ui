import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import AccoladeBadgeList from "@/codeforafrica/components/AccoladeBadgeList";
import ProjectDetails from "@/codeforafrica/components/ProjectDetails";
import ProjectPageHeader from "@/codeforafrica/components/ProjectPageHeader";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import SectionDivider from "@/codeforafrica/components/SectionDivider";
import TeamMembers from "@/codeforafrica/components/TeamMembers";

function Project(props) {
  const {
    badges,
    description,
    donors,
    links,
    partners,
    relatedProjects: { title, projects } = {},
    team,
    stories,
    descriptionTitle,
  } = props;

  return (
    <>
      <ProjectPageHeader {...props} />
      <Section
        sx={{
          marginTop: { xs: "26.6px", sm: "20px", md: "56px" },
          marginBottom: "42px",
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <AccoladeBadgeList badges={badges} />
      </Section>
      <ProjectDetails
        description={description}
        donors={donors}
        links={links}
        descriptionTitle={descriptionTitle}
        partners={partners}
        sx={{
          mt: "42px",
          px: { xs: 2.5, sm: 0 },
        }}
      />
      {stories ? (
        <>
          <SectionDivider
            sx={{
              px: { xs: 2.5, sm: 0 },
              py: "42px",
            }}
          />
          <RelatedStories {...stories} sx={{ py: 0 }} />{" "}
        </>
      ) : null}
      {team ? (
        <>
          <SectionDivider
            sx={{
              px: { xs: 2.5, sm: 0 },
              py: "42px",
            }}
          />
          <TeamMembers
            {...team}
            sx={{ px: { xs: 2.5, sm: 0 }, overflowX: "visible" }}
          />
          <SectionDivider
            sx={{
              px: { xs: 2.5, sm: 0 },
              py: "42px",
            }}
          />
        </>
      ) : null}
      <Box
        sx={{
          bgcolor: { xs: "none", md: "background.main" },
        }}
      >
        <RelatedProjects
          sx={{
            py: { xs: 5, md: 8, lg: 10 },
          }}
          title={title}
          projects={projects}
        />
      </Box>
    </>
  );
}

export default Project;
