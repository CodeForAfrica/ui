import { Link } from "@commons-ui/next";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";

const ProjectTileRoot = styled(Card, {
  slot: "Root",
})(({ theme, ownerState }) => ({
  border: `1px solid ${theme.palette.grey.light}`,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  ...(ownerState.variant === "standard" && {
    width: "fit-content",
    padding: `${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(16)}`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.typography.pxToRem(25)} ${theme.typography.pxToRem(
        16
      )}`,
    },
  }),
  ...(ownerState.variant === "detailed" && {
    padding: `${theme.typography.pxToRem(8)} ${theme.typography.pxToRem(24)}`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.typography.pxToRem(25)} ${theme.typography.pxToRem(
        16
      )}`,
    },
  }),
  "&:hover": {
    background:
      "linear-gradient(263.93deg, rgba(13, 25, 212, 0) 0%, rgba(13, 25, 212, 0.1) 100.64%), #FFFFFF",
    border: `1px solid #737FF2`,
  },
}));

const ProjectTileActionAreaRoot = styled(CardActionArea, {
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  columnGap: theme.typography.pxToRem(26),
  "&:hover": {},
}));

const ProjectTile = React.forwardRef(function ProjectTile(props, ref) {
  const { href, icon, name, tagLine, variant = "standard", ...other } = props;

  const ownerState = {
    variant,
  };

  return (
    <ProjectTileRoot
      elevation={0}
      square
      variant="outlined"
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <ProjectTileActionAreaRoot
        component={href ? Link : undefined}
        href={href}
      >
        <CardMedia
          {...icon}
          component="img"
          sx={{ height: "70px", width: "70px" }}
        />
        <Typography
          variant="h4"
          sx={{
            display: variant === "detailed" ? "none" : "flex",
          }}
        >
          {name}
        </Typography>
        <Stack
          sx={{
            display: variant === "detailed" ? "flex" : "none",
            spacing: "6px",
          }}
        >
          <Typography variant="body3SemiBold">{name}</Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#9F9494",
            }}
          >
            {tagLine}
          </Typography>
        </Stack>
      </ProjectTileActionAreaRoot>
    </ProjectTileRoot>
  );
});

ProjectTile.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.shape({}),
  name: PropTypes.string,
  tagLine: PropTypes.string,
  variant: PropTypes.oneOf(["standard", "detailed"]),
};

ProjectTile.defaultProps = {
  icon: undefined,
  href: undefined,
  name: undefined,
  tagLine: undefined,
  variant: undefined,
};

export default ProjectTile;
