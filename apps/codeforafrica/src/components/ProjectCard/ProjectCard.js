import { Link } from "@commons-ui/next";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import ProjectCardMedia from "@/codeforafrica/components/ProjectCardMedia";
import ProjectTile from "@/codeforafrica/components/ProjectTile";
import RichText from "@/codeforafrica/components/RichText";

const ProjectActionArea = styled(CardActionArea, {
  slot: "Root",
})(({ theme }) => ({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: `${theme.spacing(2.5)} 0`,
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    padding: `${theme.spacing(5)} 0`,
  },
}));

const ProjectCard = React.forwardRef(function ProjectCard(props, ref) {
  const {
    link: { href },
    icon,
    name,
    subtitle,
    tagLine,
    title,
    thumbnail,
    ...other
  } = props;

  const ownerState = {
    ...other,
  };
  const tileProps = { icon, name, tagLine };

  return (
    <Card elevation={0} square ref={ref} ownerState={ownerState}>
      <ProjectActionArea component={href ? Link : undefined} href={href}>
        <Box>
          <ProjectCardMedia {...thumbnail} component="img" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              p: 0,
              "&:last-child": {
                p: 0,
              },
            }}
          >
            <ProjectTile {...tileProps} />
            <RichText
              typographyProps={{ variant: "h5Small", color: "primary" }}
              sx={{ mt: 2, typography: { md: "h5" } }}
              elements={title}
            />
            <RichText
              elements={subtitle}
              typographyProps={{ variant: "body1" }}
              sx={{ mt: 2.5, typography: { md: "body2" } }}
            />
          </CardContent>
          <CardActions sx={{ mt: 2, p: 0 }}>
            <Button component="div" variant="contained-reverse" sx={{ py: 1 }}>
              Learn More
            </Button>
          </CardActions>
        </Box>
      </ProjectActionArea>
    </Card>
  );
});

export default ProjectCard;
