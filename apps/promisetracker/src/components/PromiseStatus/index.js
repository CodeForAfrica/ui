import React from "react";
import PropTypes from "prop-types";

import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: (props) => {
    const backgroundColor = props.color || "#909090"; // inconclusive color
    const color = props.textColor || palette.text.primary;

    return {
      backgroundColor,
      borderRadius: 10,
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

function Status({ title, ...props }) {
  const classes = useStyles(props);

  return <Chip label={title} classes={{ root: classes.root }} />;
}

Status.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Status.defaultProps = {
  color: undefined,
  textColor: undefined,
};

export default Status;
