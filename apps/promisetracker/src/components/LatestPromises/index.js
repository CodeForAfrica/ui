import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import Link from "@/promisetracker/components/Link";

import { Section } from "@commons-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";
import PromiseCard from "@/promisetracker/components/PromiseCard";

import useStyles from "./useStyles";

function LatestPromises({ actionLabel, items, title, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!items?.length) {
    return null;
  }
  return (
    <Section
      title={title}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <Grid container justify="flex-start">
        {items.map((promise, i) => (
          <Grid
            key={promise.title}
            item
            xs={12}
            lg="auto"
            className={clsx({
              [classes.row]: (!isDesktop && i > 0) || i > 2,
              [classes.gridItem]: i % 3 === 1,
            })}
          >
            <PromiseCard {...promise} component="div" />
          </Grid>
        ))}
      </Grid>
      {actionLabel && (
        <Link href="/promises" className={classes.link}>
          <CtAButton classes={{ root: classes.cta, button: classes.ctaButton }}>
            {actionLabel}
          </CtAButton>
        </Link>
      )}
    </Section>
  );
}

LatestPromises.propTypes = {
  actionLabel: PropTypes.string,
  classes: PropTypes.shape({
    card: PropTypes.string,
    scrollBar: PropTypes.string,
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
    root: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

LatestPromises.defaultProps = {
  actionLabel: undefined,
  classes: undefined,
  items: undefined,
  title: undefined,
};

export default LatestPromises;
