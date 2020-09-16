import React from "react";
import PropTypes from "prop-types";

import { Chip } from "@material-ui/core";

import useStyles from "./useStyles";

function Status({ title, ...props }) {
  const classes = useStyles(props);

  return <Chip label={title} classes={{ root: classes.status }} />;
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
