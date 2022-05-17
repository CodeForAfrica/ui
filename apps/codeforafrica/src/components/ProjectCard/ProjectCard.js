import { RichTypography } from "@commons-ui/core";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import React from "react";

import ProjectCardMedia from "@/codeforafrica/components/ProjectCardMedia";
import ProjectTile from "@/codeforafrica/components/ProjectTile";

const ProjectCardRoot = styled(Card, {
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    gap: 58,
    padding: `0 ${theme.spacing(5)}`,
  },
}));

const ProjectCard = React.forwardRef(function ProjectCard(props, ref) {
  const { href, icon, name, subtitle, tagLine, title, thumbnail, ...other } =
    props;

  const ownerState = {
    ...other,
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
      <CardContent
        sx={{
          p: 0,
          "&:last-child": {
            p: 0,
          },
        }}
      >
        <ProjectTile {...tileProps} />
        <RichTypography color="primary" variant="h5" sx={{ mt: 2 }}>
          {title}
        </RichTypography>
        <RichTypography
          variant="body1"
          sx={{ mt: 2.5, typography: { md: "body2" } }}
        >
          {subtitle}
        </RichTypography>
      </CardContent>
      <CardActions sx={{ p: 0 }}>
        <Button variant="outlined">Learn More</Button>
      </CardActions>
    </ProjectCardRoot>
  );
});

export default ProjectCard;
