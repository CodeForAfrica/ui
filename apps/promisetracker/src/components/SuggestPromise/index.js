import { RichTypography } from "@commons-ui/core";
import { Button, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function SuggestPromise({ className, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8}>
        <RichTypography variant="h3" className={classes.description}>
          Know of a promise we should investigate? Tell us about it.
        </RichTypography>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.suggestPromiseBtn}>Suggest A Promise</Button>
      </Grid>
    </Grid>
  );
}

SuggestPromise.propTypes = {
  className: PropTypes.string,
};

SuggestPromise.defaultProps = {
  className: undefined,
};

export default SuggestPromise;
