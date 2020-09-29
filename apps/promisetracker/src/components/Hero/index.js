import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";
import Profile from "@/promisetracker/components/Hero/Profile";
import ProfileChart from "@/promisetracker/components/Hero/ProfileChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {},
  section: {},
  hero: {
    padding: `${typography.pxToRem(32)} 0`,
  },
}));

function TitleTypography({ name }) {
  return <Typography variant="h1">{name}</Typography>;
}

TitleTypography.propTypes = {
  name: PropTypes.string.isRequired,
};

function Hero(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Section classes={{ root: classes.section }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={6}
        className={classes.hero}
      >
        {!isDesktop ? <TitleTypography name="Mike “Sonko” Mbuvi" /> : null}
        <Profile
          name="Mike “Sonko” Mbuvi"
          subtitle="Campaign promises made by Mike Mbuvi"
          date="Updated June 16, 2020"
        />
        <ProfileChart />
      </Grid>
    </Section>
  );
}

export default Hero;
