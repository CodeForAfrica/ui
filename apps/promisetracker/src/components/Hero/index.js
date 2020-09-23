import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";
import Profile from "@/promisetracker/components/Hero/Profile";
import Chart from "@/promisetracker/components/Hero/Chart";

const useStyles = makeStyles(({ typography }) => ({
  root: {},
  hero: {
    paddingTop: typography.pxToRem(24),
  },
}));
function Hero(props) {
  const classes = useStyles(props);
  return (
    <Section classes={{ root: classes.section }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={5}
        className={classes.hero}
      >
        <Profile
          name="Mike “Sonko” Mbuvi"
          subtitle="Campaign promises made by Mike Mbuvi"
          date="Updated June 16, 2020"
        />
        <Chart />
      </Grid>
    </Section>
  );
}

export default Hero;
