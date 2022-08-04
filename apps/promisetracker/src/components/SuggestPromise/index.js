import { RichTypography } from "@commons-ui/core";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function SuggestPromise({ description, label, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8}>
        <RichTypography variant="h3" className={classes.description}>
          {description}
        </RichTypography>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.suggestPromiseBtn}>{label}</Button>
      </Grid>
    </Grid>
  );
}

SuggestPromise.propTypes = {
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

SuggestPromise.defaultProps = {};

export default SuggestPromise;
