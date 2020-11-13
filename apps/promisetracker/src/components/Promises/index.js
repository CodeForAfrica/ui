import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import Filter from "@/promisetracker/components/Promises/Filter";
import PostCardGrid from "@/promisetracker/components/PostCardGrid";
import PromiseCard from "@/promisetracker/components/PromiseCard";
import Sort from "@/promisetracker/components/Promises/Sort";

import useStyles from "./useStyles";

function Promises({ items, title, withFilter, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <PostCardGrid
      component={PromiseCard}
      items={items}
      title={title}
      classes={{
        section: classes.section,
        sectionTitle: classes.sectionTitle,
      }}
    >
      {withFilter && (
        <Grid className={classes.filterGrid} container justify="space-between">
          <Grid item xs={12} lg={5}>
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
          </Grid>
          <Grid item xs={12} lg={5}>
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
          </Grid>
          <Grid item xs={12} lg={2}>
            <Sort />
          </Grid>
        </Grid>
      )}
    </PostCardGrid>
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
  withFilter: PropTypes.bool,
};

Promises.defaultProps = {
  classes: undefined,
  items: undefined,
  title: undefined,
  withFilter: true,
};

export default Promises;
