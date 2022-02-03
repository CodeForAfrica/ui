import { RichTypography, Section } from "@commons-ui/core";
import { Grid, Hidden, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import Radar from "./Radar";
import useStyles from "./useStyles";

import ActNowCard from "@/promisetracker/components/ActNowCard";
import Dataset from "@/promisetracker/components/Dataset";
import DataSource from "@/promisetracker/components/DataSource";
import Link from "@/promisetracker/components/Link";
import AuthorAtribution from "@/promisetracker/components/Promise/AuthorAtribution";
import NarativeUpdates from "@/promisetracker/components/Promise/Narative";
import RelatedFactChecks from "@/promisetracker/components/Promise/RelatedFactChecks";
import PromiseChart from "@/promisetracker/components/PromiseChart";
import Status from "@/promisetracker/components/PromiseStatus";

function Promise({
  promise,
  breadcrumb,
  classes: classesProp,
  promiseStatusLabel,
  promiseRadarLabel,
  relatedFactChecksLabel,
  dataSourceEmbedLabel,
  narrativeUpdatesLabel,
  ...props
}) {
  const classes = useStyles({ image: promise.image, classes: classesProp });

  const { location } = promise;
  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Typography className={classes.promisesLabel} variant="h4">
            <Link href="/promises" as="/promises" className={classes.link}>
              {breadcrumb}
            </Link>
          </Typography>
          <RichTypography variant="h1" className={classes.promiseTitle}>
            {promise.title}
          </RichTypography>
          <div className={classes.featuredImageContainer} />
          <ActNowCard {...props} />
          <Hidden lgUp implementation="css">
            <div className={classes.mobileStatusContainer}>
              <Grid item className={classes.mobileStatusLabelGrid}>
                <RichTypography variant="h5" className={classes.statusLabel}>
                  Promise rating status:
                </RichTypography>
                <Status
                  {...promise.status}
                  classes={{ root: classes.mobileStatus }}
                />
              </Grid>
            </div>
          </Hidden>
          <RichTypography className={classes.promiseBody} variant="body1">
            {promise.description}
          </RichTypography>
          <Hidden lgUp>
            <Typography className={classes.label} variant="h5">
              {promiseRadarLabel}
            </Typography>
            {location?.length ? <Radar location={promise.location} /> : null}
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
            <RichTypography variant="h4" className={classes.statusLabel}>
              Promise rating status:
            </RichTypography>
            <Status {...promise.status} classes={{ root: classes.status }} />
            <Typography className={classes.label} variant="h5">
              {promiseRadarLabel}
            </Typography>
            {location?.length ? <Radar location={promise.location} /> : null}
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
    location: PropTypes.arrayOf(PropTypes.string),
    documents: PropTypes.arrayOf(PropTypes.shape({})),
    relatedFactChecks: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  breadcrumb: PropTypes.string,
  classes: PropTypes.shape({
    promiseBody: PropTypes.string,
    promiseFooter: PropTypes.string,
    date: PropTypes.string,
    statusLabel: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    featuredImageContainer: PropTypes.string,
    link: PropTypes.string,
    mobileStatus: PropTypes.string,
    mobileStatusContainer: PropTypes.string,
    mobileStatusLabel: PropTypes.string,
    mobileStatusLabelGrid: PropTypes.string,
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
