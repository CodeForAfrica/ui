import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import PromiseCard from "@/promisetracker/components/PromiseCard";
import Category from "@/promisetracker/components/Promises/Category";
import Sort from "@/promisetracker/components/Promises/Sort";
import Status from "@/promisetracker/components/Promises/Status";
import useStyles from "./useStyles";

function Promises({ items, title, ...props }) {
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
      <Grid container justify="space-between">
        <Grid item xs={12} lg={4}>
          <Status />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Category />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Sort />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        {items.map((promise, i) => (
          <Grid
            key={promise.name}
            item
            xs={12}
            lg="auto"
            className={clsx({ [classes.row]: (!isDesktop && i > 0) || i > 2 })}
          >
            <PromiseCard {...promise} component="div" />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

Promises.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string,
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
    root: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Promises.defaultProps = {
  classes: undefined,
  items: undefined,
  title: undefined,
};

export default Promises;
