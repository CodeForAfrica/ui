import { Section, RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import ExternalLinkIcon from "@/codeforafrica/assets/icons/Type=external-link, Size=24, Color=White.svg";
import Breadcrumbs from "@/codeforafrica/components/Breadcrumbs";
import ProjectCardMedia from "@/codeforafrica/components/ProjectCardMedia";
import ProjectTile from "@/codeforafrica/components/ProjectTile";
import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const Background = styled(TwoToneBackground, {
  slot: "Root",
})(({ theme }) => ({
  "&:before": {
    // Override [0, md) down leaving [md, ∞) untouched.
    [theme.breakpoints.down("md")]: {
      background: theme.palette.background.main,
    },
  },
}));

const ProjectPageHeaderRoot = styled(Card, {
  slot: "Root",
})(({ theme }) => ({
  backgroundColor: "inherit",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  padding: `${theme.spacing(2.5)} 0`,
  [theme.breakpoints.up("sm")]: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: `20px 0`,
  },
  [theme.breakpoints.up("md")]: {
    alignItems: "center",
    padding: `89px 0`,
  },
}));

const ProjectTitle = styled(RichTypography, {
  slot: "Root",
})(({ theme }) => ({
  "& .highlight": {
    color: theme.palette.primary.main,
  },
}));

const ProjectPageHeader = React.forwardRef(function ProjectPageHeader(
  props,
  ref
) {
  const {
    externalHref,
    icon,
    name,
    subtitle,
    sx,
    tag,
    tagLine,
    title,
    thumbnail,
  } = props;
  const crumbs = [{ href: "/projects", label: "Our Work" }, { label: tag }];
  const tileProps = { icon, name, tagLine };

  return (
    <Background ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, zIndex: 1, ...sx }}>
        <ProjectPageHeaderRoot elevation={0} square>
          <Breadcrumbs
            crumbs={crumbs}
            sx={{
              color: "text.primary",
              display: { xs: "flex", sm: "none", md: "flex" },
              flexBasis: "100%",
              order: { xs: 0 },
              width: "100%",
            }}
          />
          <ProjectCardMedia
            {...thumbnail}
            component="img"
            sx={{ mt: { xs: 2.5, sm: 0 }, order: { xs: 1, sm: 2 } }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: { xs: 2.5, sm: 0 },
              order: { xs: 2, sm: 1 },
              width: { xs: "100%", sm: "350px", md: "488px" },
            }}
          >
            <Breadcrumbs
              crumbs={crumbs}
              sx={{
                color: "text.primary",
                display: { xs: "none", sm: "flex", md: "none" },
              }}
            />
            <CardContent
              sx={{
                mt: { sm: 2.5 },
                p: 0,
                "&:last-child": {
                  p: 0,
                },
              }}
            >
              <ProjectTile {...tileProps} />
              <ProjectTitle
                variant="h4"
                sx={{ mt: 2, typography: { md: "h2" } }}
              >
                {title}
              </ProjectTitle>
              <RichTypography
                variant="body2"
                sx={{ mt: 2.5, typography: { md: "subheading" } }}
              >
                {subtitle}
              </RichTypography>
            </CardContent>
            <CardActions sx={{ mt: 2, p: 0 }}>
              <Button
                href={externalHref}
                component={externalHref ? Link : undefined}
                endIcon={
                  <SvgIcon component={ExternalLinkIcon} sx={{ fill: "none" }} />
                }
                variant="contained"
                sx={{ py: 1 }}
              >
                Launch Project
              </Button>
            </CardActions>
          </Box>
        </ProjectPageHeaderRoot>
      </Section>
    </Background>
  );
});

export default ProjectPageHeader;
