import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import ProjectTileList from "@/codeforafrica/components/ProjectTileList";

const RelatedProjects = React.forwardRef(function RelatedProjects(props, ref) {
  const { projects, sx, tileListProps, title, titleProps } = props;

  if (!projects?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography
        variant="h5"
        sx={{
          mb: { xs: "18px", md: 5 },
        }}
        {...titleProps}
      >
        {title}
      </RichTypography>
      <ProjectTileList {...tileListProps} projects={projects.slice(0, 3)} />
    </Section>
  );
});

export default RelatedProjects;
