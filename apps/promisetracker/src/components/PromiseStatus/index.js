import { Chip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: (props) => {
    const backgroundColor = props.color || "#909090"; // inconclusive color
    const color = props.textColor || palette.text.primary;

    return {
      backgroundColor,
      borderRadius: 0,
      color,
      fontSize: typography.pxToRem(7),
      fontWeight: 700,
      letterSpacing: 0.28,
      lineHeight: 24 / 7,
      marginTop: typography.pxToRem(17),
      textTransform: "uppercase",
      [breakpoints.up("lg")]: {
        fontSize: typography.pxToRem(10),
        letterSpacing: 0.4,
        lineHeight: 24 / 10,
        marginTop: typography.pxToRem(15),
      },
    };
  },
}));

function Status({ className, title, ...props }) {
  const classes = useStyles(props);

  return <Chip label={title} className={clsx(classes.root, className)} />;
}

Status.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Status.defaultProps = {
  className: undefined,
  color: undefined,
  textColor: undefined,
};

export default Status;
