import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import React from "react";

import ProjectCardMedia from "@/codeforafrica/components/ProjectCardMedia";
import ProjectTile from "@/codeforafrica/components/ProjectTile";

const ProjectCardRoot = styled(Card, {
  slot: "Root",
})(() => ({
  display: "flex",
}));

const ProjectCard = React.forwardRef(function ProjectCard(props, ref) {
  const {
    href,
    icon,
    name,
    square = true,
    tagLine,
    thumbnail,
    ...other
  } = props;

  const ownerState = {
    ...other,
    square,
  };
  const tileProps = { href, icon, name, tagLine };

  return (
    <ProjectCardRoot
      elevation={0}
      square
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <ProjectCardMedia {...thumbnail} component="img" />
      <CardContent>
        <ProjectTile {...tileProps} />
      </CardContent>
    </ProjectCardRoot>
  );
});

export default ProjectCard;
