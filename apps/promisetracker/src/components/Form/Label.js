import { InputLabel } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function Label({ className, shrink, ...props }) {
  const classes = useStyles(props);

  return (
    <InputLabel
      {...props}
      shrink={shrink}
      classes={{
        root: clsx(classes.label, className),
      }}
    />
  );
}

Label.propTypes = {
  className: PropTypes.string,
  shrink: PropTypes.bool,
};

Label.defaultProps = {
  className: undefined,
  shrink: false,
};

export default Label;
