import React from "react";
import PropTypes from "prop-types";

import { Button, Container } from "@material-ui/core";

import useStyles from "./useStyles";

function CtAButton({ classes: classesProp, ...props }) {
  const classes = useStyles({ classes: classesProp });

  return (
    <Container className={classes.root}>
      <Button variant="contained" {...props} className={classes.button} />
    </Container>
  );
}

CtAButton.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    root: PropTypes.string,
  }),
};

CtAButton.defaultProps = {
  classes: undefined,
};

export default CtAButton;
