import { Grid } from "@mui/material";
import React from "react";

import ProjectTile from "@/codeforafrica/components/ProjectTile";

const ProjectTileList = React.forwardRef(function ProjectTileList(props, ref) {
  const { itemProps, fixed, projects, ...other } = props;

  if (!projects?.length) {
    return null;
  }
  const sm = fixed ? 12 : 6;
  const md = fixed ? 6 : 4;
  return (
    <Grid container spacing="18px" {...other} ref={ref}>
      {projects?.map((project) => (
        <Grid key={project.href} item xs={12} sm={sm} md={md} {...itemProps}>
          <ProjectTile variant="detailed" {...project} />
        </Grid>
      ))}
    </Grid>
  );
});

export default ProjectTileList;
