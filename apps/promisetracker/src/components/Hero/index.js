import { Section } from "@commons-ui/core";
import { Grid, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Profile from "@/promisetracker/components/Hero/Profile";
import ProfileChart from "@/promisetracker/components/Hero/ProfileChart";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    paddingBottom: typography.pxToRem(40),
    paddingTop: typography.pxToRem(22),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(44),
      paddingTop: typography.pxToRem(80),
    },
  },
  section: {},
}));

function Hero({
  criteria,
  name,
  photo,
  position,
  promisesByStatus,
  updatedAt,
  updatedAtLabel,
  title,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container direction="row" justify="space-between">
          <Hidden lgUp implementation="css">
            <Grid item xs={12}>
              <Typography variant="h1">{name}</Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} lg={4}>
            <Profile
              date={`${updatedAt}`}
              dateLabel={updatedAtLabel}
              name={name}
              photo={photo}
              title={title}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProfileChart
              promisesByStatus={promisesByStatus}
              criteria={criteria}
              name={name}
              position={position}
              {...props}
            />
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Hero.propTypes = {
  criteria: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  title: PropTypes.string.isRequired,
  updatedAtLabel: PropTypes.string.isRequired,
  promisesByStatus: PropTypes.shape({}),
};

Hero.defaultProps = {
  criteria: undefined,
  promisesByStatus: undefined,
};

export default Hero;
