import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";

import Filter from "@/promisetracker/components/Promises/Filter";
import PostCardGrid from "@/promisetracker/components/PostCardGrid";
import PromiseCard from "@/promisetracker/components/PromiseCard";
import Sort from "@/promisetracker/components/Promises/Sort";

import { slugify } from "@/promisetracker/utils";

import useStyles from "./useStyles";

function Promises({
  items: itemsProp,
  title,
  withFilter,
  projectMeta,
  promiseStatuses,
  sortLabels,
  ...props
}) {
  const classes = useStyles(props);

  const sortByDeadline = sortLabels?.sortByDeadline;
  const sortByMostRecent = sortLabels?.sortByMostRecent;
  const filterCategoryItems = projectMeta?.tags;
  const filterStatusItems = promiseStatuses;
  const [items, setItems] = useState(itemsProp);
  const [statusesFilters, setStatusesFilters] = useState(filterStatusItems);
  const [categoriesFilters, setCategoriesFilters] = useState(
    filterCategoryItems
  );
  const [sortBy, setSortBy] = useState(sortByMostRecent?.slug);

  const updateFilters = (filters, slug) =>
    filters.map((f) => (f.slug === slug ? { ...f, active: !f.active } : f));
  const handleStatusClick = (slug) => {
    setStatusesFilters((prev) => updateFilters(prev, slug));
  };
  const handleCategoryClick = (slug) => {
    setCategoriesFilters((prev) => updateFilters(prev, slug));
  };
  const handleSortClicked = (slug) => {
    setSortBy(slug);
  };

  if (withFilter) {
    useEffect(() => {
      const selectedStatuses = statusesFilters
        ?.filter((filter) => filter.active)
        .map((filter) => filter.slug);
      const hasStatus = (item) => {
        const promiseSlug = slugify(item.status.title);
        return selectedStatuses.every((c) => c === promiseSlug);
      };
      const selectedCategories = categoriesFilters
        ?.filter((filter) => filter.active)
        .map((filter) => filter.slug);
      const hasCategory = (item) => {
        const promiseCategories = item?.tags.map((tag) => slugify(tag));
        return selectedCategories.every((c) => promiseCategories.includes(c));
      };
      const filteredItems = itemsProp.filter(hasStatus).filter(hasCategory);
      const hasFilters = selectedStatuses.length || selectedCategories.length;
      setItems(hasFilters ? filteredItems : itemsProp);
    }, [statusesFilters, categoriesFilters, itemsProp]);
    useEffect(() => {
      let sortedItems = items;
      if (sortBy === sortByMostRecent.slug) {
        sortedItems = items.sort((a, b) => a.date.localeCompare(b.date));
      } else if (sortBy === sortByDeadline.slug) {
        sortedItems = items.sort((a, b) => {
          const aDeadline = a.events?.[0]?.year ?? 0;
          const bDeadline = b.events?.[0]?.year ?? 0;
          return bDeadline - aDeadline;
        });
      }
      setItems(sortedItems);
    }, [sortBy]);
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
          <Grid item xs={12} lg={4}>
            <Filter
              label="Promises by status"
              items={statusesFilters}
              onClick={handleStatusClick}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Filter
              label="Promises by category"
              items={categoriesFilters}
              onClick={handleCategoryClick}
            />
          </Grid>
          <Grid item xs={6} lg={2} className={classes.sortItems}>
            <Typography className={classes.label} variant="h6">
              Sort By
            </Typography>
            <Sort {...sortByMostRecent} onClick={handleSortClicked} />
            <Sort {...sortByDeadline} onClick={handleSortClicked} />
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
  projectMeta: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  promiseStatuses: PropTypes.arrayOf(PropTypes.shape({})),
  sortLabels: PropTypes.shape({
    sortByDeadline: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
    sortByMostRecent: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
  withFilter: PropTypes.bool,
};

Promises.defaultProps = {
  classes: undefined,
  items: undefined,
  projectMeta: undefined,
  promiseStatuses: [],
  sortLabels: undefined,
  title: undefined,
  withFilter: true,
};

export default Promises;
