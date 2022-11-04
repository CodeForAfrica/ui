import { Figure, Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";

const ProjectTileRoot = styled(Paper, {
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
  ...(ownerState.href && {
    "&:hover": {
      background:
        "linear-gradient(263.93deg, rgba(13, 25, 212, 0) 0%, rgba(13, 25, 212, 0.1) 100.64%), #FFFFFF",
      border: `1px solid #737FF2`,
    },
  }),
}));

const ProjectTile = React.forwardRef(function ProjectTile(props, ref) {
  const { href, icon, name, sx, tagLine, variant = "standard" } = props;

  const ownerState = {
    href,
    variant,
  };

  return (
    <ProjectTileRoot
      elevation={0}
      square
      variant="outlined"
      ref={ref}
      ownerState={ownerState}
      sx={sx}
    >
      <Box
        component={href ? Link : undefined}
        href={href}
        sx={{
          color: "text.primary",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          columnGap: "26px",
          textDecoration: "none",
        }}
      >
        <>
          {icon?.src?.length > 0 ? (
            <Figure
              ImageProps={{ alt: name, ...icon }}
              sx={{ height: "70px", width: "70px" }}
            />
          ) : null}
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
              {tagLine?.substring(0, 25)}
            </Typography>
          </Stack>
        </>
      </Box>
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
