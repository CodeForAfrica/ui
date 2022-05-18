import Grid from "@mui/material/Grid";
import React from "react";

import ProjectTile from "@/codeforafrica/components/ProjectTile";

const ProjectTileList = React.forwardRef(function ProjectTileList(props, ref) {
  const { itemProps, projects, ...other } = props;

  if (!projects?.length) {
    return null;
  }
  return (
    <Grid container spacing="18px" {...other} ref={ref}>
      {projects?.map((project) => (
        <Grid key={project.href} item xs={12} sm={6} md={4} {...itemProps}>
          <ProjectTile variant="detailed" {...project} />
        </Grid>
      ))}
    </Grid>
  );
});

export default ProjectTileList;
