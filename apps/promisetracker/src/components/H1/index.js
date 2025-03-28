import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    fontWeight: 600,
    marginBottom: typography.pxToRem(0),
    marginTop: typography.pxToRem(38),
    padding: `${typography.pxToRem(8)} 0`,
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: typography.pxToRem(80),
      borderBottom: `5px solid ${palette.primary.dark}`,
    },
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(60),
      marginBottom: typography.pxToRem(42),
      padding: `${typography.pxToRem(4)} 0`,
    },
  },
}));

function H1({ className, ...props }) {
  const classes = useStyles(props);

  return (
    <Typography
      {...props}
      variant="h1"
      className={clsx(classes.root, className)}
    />
  );
}

H1.propTypes = {
  className: PropTypes.string,
};

export default H1;
