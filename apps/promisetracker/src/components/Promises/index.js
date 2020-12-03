import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import Filter from "@/promisetracker/components/Promises/Filter";
import PostCardGrid from "@/promisetracker/components/PostCardGrid";
import PromiseCard from "@/promisetracker/components/PromiseCard";
import Sort from "@/promisetracker/components/Promises/Sort";

import { slugify } from "@/promisetracker/utils";

import config from "@/promisetracker/config";
import useStyles from "./useStyles";

function Promises({ items: itemsProp, title, withFilter, ...props }) {
  const classes = useStyles(props);
  const { filterStatusItems, filterCategoryItems } = config;

  const [items, setItems] = useState(itemsProp);
  useEffect(() => {
    setItems(itemsProp);
  }, [itemsProp]);

  const [activeStatus, setActiveStatus] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const handleStatusClick = (value) => {
    setActiveStatus(value);
  };
  const handleCategoryClick = (value) => {
    setActiveCategory(value);
  };

  if (!items?.length) {
    return null;
  }

  const filteredItems = items
    .filter((item) => item !== undefined)
    .filter(
      (value) =>
        !activeStatus ||
        slugify(value.status.title) === activeStatus ||
        !value.tags[0] ||
        slugify(value.tags[0]) === activeCategory
    );

  return (
    <PostCardGrid
      component={PromiseCard}
      items={filteredItems}
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
              activeStatus={activeStatus}
              label="Promises by status"
              filterItems={filterStatusItems}
              onButtonClick={handleStatusClick}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Filter
              activeCategory={activeCategory}
              label="Promises by category"
              filterItems={filterCategoryItems}
              onButtonClick={handleCategoryClick}
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
