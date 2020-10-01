import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, Hidden, useMediaQuery } from "@material-ui/core";
import { RichTypography } from "@commons-ui/core";
import { useTheme } from "@material-ui/core/styles";

import Link from "@/promisetracker/components/Link";
import RelatedFactChecks from "@/promisetracker/components/Promise/RelatedFactChecks";
import NarativeUpdates from "@/promisetracker/components/Promise/Narative";
import AuthorAtribution from "@/promisetracker/components/Promise/AuthorAtribution";
import Radar from "@/promisetracker/components/Promise/Radar";
import Status from "@/promisetracker/components/PromiseStatus";
import Section from "@commons-ui/core/Section";

import useStyles from "./useStyles";

function Promise({
  promise,
  promiseLabel,
  breadcrumb,
  classes: classesProp,
  promiseStatusLabel,
  promiseRadarLabel,
  relatedFactChecksLabel,
}) {
  const classes = useStyles({ image: promise.image, classes: classesProp });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const titleVariant = isDesktop ? "h2" : "h3";

  return (
    <Section classes={{ root: classes.section }}>
      <Hidden lgUp>
        <Link href="/promises" as="/promises" className={classes.link}>
          <Typography className={classes.label} variant="h4">
            {breadcrumb}
          </Typography>
        </Link>
      </Hidden>

      <Grid container>
        <Grid item xs={12} lg={8}>
          <div className={classes.featuredImageContainer} />
          <Hidden mdDown>
            <Typography className={classes.label} variant="h4">
              {promiseLabel}
            </Typography>
          </Hidden>
          <RichTypography
            variant={titleVariant}
            className={classes.promiseTitle}
          >
            {promise.title}
          </RichTypography>
          <Hidden lgUp>
            <div className={classes.mobileStatusContainer}>
              <Typography className={classes.mobileStatusLabel} variant="h5">
                {promiseStatusLabel}
              </Typography>
              <Status
                {...promise.status}
                classes={{ root: classes.mobileStatus }}
              />
            </div>
          </Hidden>

          <RichTypography className={classes.promiseBody} variant="body1">
            {promise.body}
          </RichTypography>
          <Hidden lgUp>
            <Typography className={classes.label} variant="h5">
              {promiseRadarLabel}
            </Typography>
            <Radar />
          </Hidden>
          <NarativeUpdates />
          <RichTypography className={classes.promiseBody} variant="body1">
            {promise.body}
          </RichTypography>
          <AuthorAtribution />
        </Grid>
        <Grid item md={1} implementation="css" smDown component={Hidden} />
        <Hidden mdDown>
          <Grid item xs={12} lg={3}>
            <Typography className={classes.label} variant="h5">
              {promiseStatusLabel}
            </Typography>
            <Status {...promise.status} classes={{ root: classes.status }} />
            <Typography className={classes.label} variant="h5">
              {promiseRadarLabel}
            </Typography>
            <Radar />
            <Typography className={classes.label} variant="h5">
              {relatedFactChecksLabel}
            </Typography>
            <RelatedFactChecks />
          </Grid>
        </Hidden>
      </Grid>
    </Section>
  );
}

Promise.propTypes = {
  promise: PropTypes.shape({
    body: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.shape({}),
  }).isRequired,
  promiseLabel: PropTypes.string,
  breadcrumb: PropTypes.string,
  classes: PropTypes.shape({
    promiseBody: PropTypes.string,
    promiseFooter: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    featuredImageContainer: PropTypes.string,
    link: PropTypes.string,
    mobileStatus: PropTypes.string,
    mobileStatusContainer: PropTypes.string,
    mobileStatusLabel: PropTypes.string,
    root: PropTypes.string,
    section: PropTypes.string,
    status: PropTypes.string,
    label: PropTypes.string,
    promiseTitle: PropTypes.string,
  }),
  promiseStatusLabel: PropTypes.string,
  promiseRadarLabel: PropTypes.string,
  relatedFactChecksLabel: PropTypes.string,
};

Promise.defaultProps = {
  promiseLabel: "Promises",
  breadcrumb: "Promises",
  classes: undefined,
  promiseStatusLabel: "Promise rating status:",
  promiseRadarLabel: "Promise radar:",
  relatedFactChecksLabel: "Related Fact-Checks:",
};

export default Promise;
