import { RichTypography, Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import React from "react";

import ProjectTileList from "@/codeforafrica/components/ProjectTileList";

const RelatedProjects = React.forwardRef(function RelatedProjects(props, ref) {
  const { projects, title, ...other } = props;

  if (!projects?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        bgcolor: { xs: "none", md: "background.main" },
      }}
      {...other}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, md: 8, lg: 10 },
        }}
      >
        <RichTypography
          variant="h5"
          sx={{
            mb: { xs: "18px", md: 5 },
          }}
        >
          {title}
        </RichTypography>
        <ProjectTileList projects={projects.slice(0, 3)} />
      </Section>
    </Box>
  );
});

export default RelatedProjects;
