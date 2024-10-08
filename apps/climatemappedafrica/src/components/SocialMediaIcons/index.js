import { Grid, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/climatemappedafrica/components/Link";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    paddingTop: typography.pxToRem(32),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(4),
    },
  },
  image: {
    filter:
      "invert(15%) sepia(98%) saturate(6602%) hue-rotate(192deg) brightness(97%) contrast(101%);",
    [breakpoints.up("lg")]: {
      filter:
        "invert(0%) sepia(7%) saturate(27%) hue-rotate(270deg) brightness(102%) contrast(109%)",
    },
  },
  button: {
    background: palette.primary.light,
    borderRadius: 50,
    width: 48,
    height: 48,
    margin: typography.pxToRem(3.2),
    "&:hover,&:focus": {
      background: palette.primary.light,
      borderRadius: 60,
    },
    [breakpoints.up("lg")]: {
      background: "#EBEBEB",
      "&:hover,&:focus": {
        background: "#EBEBEB",
        borderRadius: 60,
      },
    },
  },
}));

function SocialMediaIcons({ socialLinks, ...props }) {
  const classes = useStyles(props);
  const viewBoxValue = "0 0 48 48";

  if (!socialLinks?.length) {
    return null;
  }
  return (
    <Grid item className={classes.root}>
      {socialLinks.map(({ href, label, src }) => (
        <IconButton
          component={Link}
          disableRipple
          disableFocusRipple
          href={href}
          key={label}
          size="medium"
          edge="end"
          viewBox={viewBoxValue}
          className={classes.button}
        >
          <Image
            src={src}
            width={24}
            height={24}
            className={classes.image}
            alt={label}
          />
        </IconButton>
      ))}
    </Grid>
  );
}

SocialMediaIcons.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
};

export default SocialMediaIcons;
