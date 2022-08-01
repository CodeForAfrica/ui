import { RichTypography, Section } from "@commons-ui/core";
import { Grid, Hidden } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import Profile from "@/promisetracker/components/Hero/Profile";
import ProfileChart from "@/promisetracker/components/Hero/ProfileChart";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    paddingBottom: typography.pxToRem(40),
    paddingTop: typography.pxToRem(22),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(44),
      paddingTop: typography.pxToRem(80),
    },
  },
  section: {},
  tagline: {
    "& .highlight": {
      color: palette.highlight.main,
    },
  },
}));

function Hero({
  criteria,
  fullName,
  name,
  photo,
  position,
  promisesByStatus,
  tagline,
  title,
  updatedAt,
  updatedAtLabel,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container direction="row" justifyContent="space-between">
          <Hidden lgUp implementation="css">
            <Grid item xs={12}>
              <RichTypography
                component="h1"
                variant="h1"
                className={classes.tagline}
              >
                {tagline || name}
              </RichTypography>
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
              name={fullName || name}
              position={position}
              tagline={tagline}
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
  fullName: PropTypes.string,
  photo: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  tagline: PropTypes.string,
  title: PropTypes.string.isRequired,
  updatedAtLabel: PropTypes.string.isRequired,
  promisesByStatus: PropTypes.shape({}),
};

Hero.defaultProps = {
  criteria: undefined,
  fullName: undefined,
  promisesByStatus: undefined,
  tagline: undefined,
};

export default Hero;
