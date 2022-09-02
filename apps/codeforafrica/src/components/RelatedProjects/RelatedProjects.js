import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
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
        variant="h5Small"
        {...titleProps}
        sx={{
          mb: { xs: "18px", md: 5, typography: { md: "h5" } },
          ...titleProps?.sx,
        }}
      >
        {title}
      </RichTypography>
      <ProjectTileList {...tileListProps} projects={projects.slice(0, 3)} />
    </Section>
  );
});

export default RelatedProjects;
