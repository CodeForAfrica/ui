import { CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const ProjectCardMediaRoot = styled(CardMedia, {
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  maxWidth: 351,
  objectFit: "contain",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: "unset",
    width: 487,
  },
}));

const ProjectCardMedia = React.forwardRef(function ProjectCardMedia(
  props,
  ref
) {
  return <ProjectCardMediaRoot component="img" {...props} ref={ref} />;
});

export default ProjectCardMedia;
