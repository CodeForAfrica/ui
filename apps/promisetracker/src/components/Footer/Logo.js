import { Link } from "@commons-ui/next";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    display: "flex",
    height: typography.pxToRem(107.85),
    position: "relative",
    width: typography.pxToRem(189.59),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(97.12),
      width: typography.pxToRem(183.54),
    },
  },
  image: {
    objectFit: "contain",
  },
}));

function Logo({ image, url, ...props }) {
  const classes = useStyles(props);

  return (
    <Link href={url} className={classes.root}>
      <Image alt="Logo" {...image} fill className={classes.root} />
    </Link>
  );
}

Logo.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default Logo;
