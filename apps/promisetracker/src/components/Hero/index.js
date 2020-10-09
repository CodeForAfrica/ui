import React from "react";
import PropTypes from "prop-types";

import { Grid, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";
import Profile from "@/promisetracker/components/Hero/Profile";
import ProfileChart from "@/promisetracker/components/Hero/ProfileChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {},
  heroSection: {},
  hero: {
    padding: `${typography.pxToRem(40)} 0`,
  },
}));

function Hero({ name, position, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Section classes={{ root: classes.heroSection }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.hero}
      >
        <Hidden lgUp>
          <Grid item xs={12}>
            <Typography variant="h1">{name}</Typography>
          </Grid>
        </Hidden>
        <Grid item xs={12} lg={4}>
          <Profile title={title} date="Updated June 16, 2020" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProfileChart name={name} />
        </Grid>
      </Grid>
    </Section>
  );
}

Hero.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Hero;
