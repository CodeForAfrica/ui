import React from "react";
import PropTypes from "prop-types";

import { Grid, Hidden, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { RichTypography, Section } from "@commons-ui/core";

import AuthorAtribution from "@/promisetracker/components/Promise/AuthorAtribution";
import Dataset from "@/promisetracker/components/Dataset";
import DataSource from "@/promisetracker/components/DataSource";
import Link from "@/promisetracker/components/Link";
import NarativeUpdates from "@/promisetracker/components/Promise/Narative";
import RelatedFactChecks from "@/promisetracker/components/Promise/RelatedFactChecks";
import Status from "@/promisetracker/components/PromiseStatus";
import PromiseChart from "@/promisetracker/components/PromiseChart";

import Radar from "./Radar";
import useStyles from "./useStyles";

function Promise({
  promise,
  breadcrumb,
  classes: classesProp,
  promiseStatusLabel,
  promiseRadarLabel,
  relatedFactChecksLabel,
  dataSourceEmbedLabel,
  narrativeUpdatesLabel,
}) {
  const classes = useStyles({ image: promise.image, classes: classesProp });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Section classes={{ root: classes.section }}>
      <Hidden lgUp>
        <Typography className={classes.promisesLabel} variant="h4">
          <Link href="/promises" as="/promises" className={classes.link}>
            {breadcrumb}
          </Link>
        </Typography>
      </Hidden>

      <Grid container>
        <Grid item xs={12} lg={8}>
          <div className={classes.featuredImageContainer} />
          <Hidden mdDown>
            <Typography className={classes.promisesLabel} variant="h4">
              <Link href="/promises" as="/promises" className={classes.link}>
                {breadcrumb}
              </Link>
            </Typography>
          </Hidden>
          <RichTypography variant="h1" className={classes.promiseTitle}>
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
            {promise.description}
          </RichTypography>
          <Hidden lgUp>
            <Typography className={classes.label} variant="h5">
              {promiseRadarLabel}
            </Typography>
            {!isDesktop ? <Radar /> : null}
          </Hidden>
          <NarativeUpdates
            {...promise.narrative}
            label={narrativeUpdatesLabel}
          />
          <DataSource
            documents={promise.documents}
            label={dataSourceEmbedLabel}
            promise={promise}
          />
          <RichTypography className={classes.promiseBody} variant="body1">
            {promise.content}
          </RichTypography>
          <PromiseChart {...promise} />
          <Dataset dataset={promise.dataset} />
          <AuthorAtribution {...promise.attribution} />
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
            {isDesktop ? <Radar /> : null}
            <Typography className={classes.label} variant="h5">
              {relatedFactChecksLabel}
            </Typography>
            <RelatedFactChecks factChecks={promise.relatedFactChecks} />
          </Grid>
        </Hidden>
      </Grid>
    </Section>
  );
}

Promise.propTypes = {
  promise: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    chartLink: PropTypes.string,
    status: PropTypes.shape({}),
    attribution: PropTypes.shape({}),
    narrative: PropTypes.shape({}),
    dataset: PropTypes.shape({}),
    documents: PropTypes.arrayOf(PropTypes.shape({})),
    relatedFactChecks: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
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
    promisesLabel: PropTypes.string,
    promiseTitle: PropTypes.string,
  }),
  promiseStatusLabel: PropTypes.string,
  promiseRadarLabel: PropTypes.string,
  relatedFactChecksLabel: PropTypes.string,
  dataSourceEmbedLabel: PropTypes.string,
  narrativeUpdatesLabel: PropTypes.string,
  chartEmbedLabel: PropTypes.string,
  authorAttributionLabel: PropTypes.string,
};

Promise.defaultProps = {
  breadcrumb: "Promises",
  classes: undefined,
  promiseStatusLabel: undefined,
  promiseRadarLabel: undefined,
  relatedFactChecksLabel: undefined,
  dataSourceEmbedLabel: undefined,
  narrativeUpdatesLabel: undefined,
  chartEmbedLabel: undefined,
  authorAttributionLabel: undefined,
};

export default Promise;
