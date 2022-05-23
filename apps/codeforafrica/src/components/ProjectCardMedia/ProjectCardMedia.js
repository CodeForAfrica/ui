import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import React from "react";

const ProjectCardMediaRoot = styled(CardMedia, {
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: 351,
  [theme.breakpoints.up("md")]: {
    maxWidth: "none",
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
