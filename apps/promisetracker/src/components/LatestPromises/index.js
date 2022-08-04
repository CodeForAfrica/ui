import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";
import PromiseCard from "@/promisetracker/components/PromiseCard";

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
      <Grid container justifyContent="flex-start">
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
