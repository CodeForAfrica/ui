import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";
import PromiseTimeline from "@/promisetracker/components/PromiseTimeline";

function KeyPromise({
  actionLabel,
  description,
  events,
  href,
  image,
  statusHistory,
  status,
  title,
  ...props
}) {
  const classes = useStyles({ ...props, image, status });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const titleVariant = isDesktop ? "h2" : "h3";

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      className={classes.keyPromise}
    >
      <Grid item xs={12} lg={5} className={classes.keyPromiseMediaGrid}>
        <div className={classes.mediaContainer}>
          <div className={classes.media} />
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        container
        direction="column"
        justifyContent="space-between"
        alignContent="stretch"
        className={classes.keyPromiseDetailsGrid}
      >
        <Grid item>
          <RichTypography
            variant={titleVariant}
            className={classes.keyPromiseTitle}
          >
            {title}
          </RichTypography>
          {isDesktop && (
            <RichTypography
              variant="body2"
              className={classes.keyPromiseDescription}
            >
              {description}
            </RichTypography>
          )}
        </Grid>
        {actionLabel && (
          <CtAButton
            component={Link}
            href={href}
            classes={{
              root: classes.keyPromiseCta,
              button: classes.keyPromiseCtaButton,
            }}
          >
            {actionLabel}
          </CtAButton>
        )}
      </Grid>
      <Grid className={classes.timelineGrid} item xs={12}>
        <PromiseTimeline
          events={events}
          status={status}
          statusHistory={statusHistory}
          classes={{ root: classes.timeline }}
        />
      </Grid>
    </Grid>
  );
}

KeyPromise.propTypes = {
  actionLabel: PropTypes.string,
  classes: PropTypes.shape({}),
  description: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  href: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  statusHistory: PropTypes.arrayOf(PropTypes.shape({})),
  status: PropTypes.shape({}),
  title: PropTypes.string.isRequired,
};

KeyPromise.defaultProps = {
  actionLabel: undefined,
  classes: undefined,
  description: undefined,
  events: undefined,
  statusHistory: undefined,
  status: undefined,
};

export default KeyPromise;
