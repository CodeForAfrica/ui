import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import PromiseCard from "@/promisetracker/components/PromiseCard";
import Filter from "@/promisetracker/components/Promises/Filter";
import Sort from "@/promisetracker/components/Promises/Sort";
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
      titleProps={{ variant: "h1" }}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <div className={classes.filterGridContainer}>
        <Filter
          label="Promises by status"
          filterItems={[
            {
              name: "Completed",
            },

            {
              name: "In Progress",
            },
            {
              name: "Stalled",
            },
            {
              name: "Behind",
            },
            {
              name: "Unrated",
            },
            {
              name: "Unstarted",
            },
          ]}
        />
        <Filter
          label="Promises by category"
          filterItems={[
            {
              name: "Immigration",
            },

            {
              name: "Trade",
            },
            {
              name: "Economy",
            },
            {
              name: "Government",
            },
            {
              name: "Environment",
            },
            {
              name: "Energy",
            },
          ]}
        />
        <Sort />
      </div>
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
