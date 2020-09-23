import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

function MobileChart(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      mobile view
    </Grid>
  );
}
export default MobileChart;
