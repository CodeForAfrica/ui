import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";
import Profile from "@/promisetracker/components/Hero/Profile";
import Chart from "@/promisetracker/components/Hero/Chart";

const useStyles = makeStyles(({ widths }) => ({
  root: {
    width: widths.values.lg,
  },
}));
function Hero(props) {
  const classes = useStyles(props);
  return (
    <Section className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Profile />
        <Chart />
      </Grid>
    </Section>
  );
}

export default Hero;
