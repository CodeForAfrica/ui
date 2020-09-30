import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, Hidden, useMediaQuery } from "@material-ui/core";
import { RichTypography } from "@commons-ui/core";
import { useTheme } from "@material-ui/core/styles";

import Link from "@/promisetracker/components/Link";
import RelatedFactChecks from "@/promisetracker/components/Promise/RelatedFactChecks";
import Status from "@/promisetracker/components/PromiseStatus";
import Section from "@commons-ui/core/Section";

import useStyles from "./useStyles";

function Promise({
  promise,
  promiseLabel,
  breadcrumb,
  classes: classesProp,
  promiseStatusLabel,
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
        <Grid item md={8}>
          <div className={classes.featuredImageContainer} />

          <Typography className={classes.label} variant="h4">
            {promiseLabel}
          </Typography>

          <RichTypography
            variant={titleVariant}
            className={classes.promiseTitle}
          >
            {promise.title}
          </RichTypography>

          <RichTypography className={classes.promiseBody} variant="body1">
            {promise.body}
          </RichTypography>
        </Grid>
        <Grid item md={1} implementation="css" smDown component={Hidden} />

        <Grid item md={3}>
          <Typography className={classes.label} variant="h5">
            {promiseStatusLabel}
          </Typography>
          <Status {...promise.status} />

          <Typography className={classes.label} variant="h5">
            {relatedFactChecksLabel}
          </Typography>
          <RelatedFactChecks />
        </Grid>
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
    root: PropTypes.string,
    section: PropTypes.string,
    label: PropTypes.string,
    promiseTitle: PropTypes.string,
  }),
  promiseStatusLabel: PropTypes.string,
  relatedFactChecksLabel: PropTypes.string,
};

Promise.defaultProps = {
  promiseLabel: "Promise",
  breadcrumb: "Promises",
  classes: undefined,
  promiseStatusLabel: "Promise rating status:",
  relatedFactChecksLabel: "Related Fact-Checks",
};

export default Promise;
