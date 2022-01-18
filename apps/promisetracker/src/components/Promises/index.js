import { Grid, Typography, Chip } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import useStyles from "./useStyles";

import PostCardGrid from "@/promisetracker/components/PostCardGrid";
import PromiseCard from "@/promisetracker/components/PromiseCard";
import Filter from "@/promisetracker/components/Promises/Filter";
import Sort from "@/promisetracker/components/Promises/Sort";
import { slugify } from "@/promisetracker/utils";

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
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState(sortByMostRecent?.slug);
  const [filterBy, setFilterBy] = useState("status");

  const getFilter = (slug) => {
    const filters = [];
    if (filterBy === "status") {
      filters.push(...filterStatusItems);
    } else {
      filters.push(...filterCategoryItems);
    }
    return filters.find((f) => f.slug === slug);
  };
  const handleFilterClick = (slug) => {
    setSelectedFilters((prev) => {
      if (prev.indexOf(slug) !== -1) {
        return prev;
      }
      return [...prev, getFilter(slug)];
    });
  };
  const handleFilterByClick = (slug) => {
    setFilterBy(slug);
    setSelectedFilters([]);
  };

  const handleChipDelete = (slug) => () => {
    setSelectedFilters((prev) => prev.filter((f) => f.slug !== slug));
  };
  const handleDeleteAllFilters = () => {
    setSelectedFilters([]);
  };
  const handleSortClicked = (slug) => {
    setSortBy(slug);
  };

  useEffect(() => {
    if (withFilter) {
      const hasStatus = (item) => {
        const promiseSlug = slugify(item.status.title);
        return selectedFilters?.every((c) => c.slug === promiseSlug);
      };
      const hasCategory = (item) => {
        const promiseCategories = item?.categories.map((c) => slugify(c.name));
        return selectedFilters?.every((c) =>
          promiseCategories.includes(c.slug)
        );
      };
      let filteredItems;
      if (filterBy === "status") {
        filteredItems = itemsProp.filter(hasStatus);
      }
      if (filterBy === "category") {
        filteredItems = itemsProp.filter(hasCategory);
      }
      const hasFilters = selectedFilters?.length;
      setItems(hasFilters ? filteredItems : itemsProp);
    }
  }, [selectedFilters, filterBy, itemsProp, withFilter]);

  useEffect(() => {
    if (withFilter) {
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
    }
  }, [sortBy, items, sortByDeadline, sortByMostRecent, withFilter]);

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
              label="Filter By"
              items={[
                {
                  name: "Status",
                  slug: "status",
                  active: filterBy === "status",
                },
                {
                  name: "Category",
                  slug: "category",
                  active: filterBy === "category",
                },
              ]}
              onClick={handleFilterByClick}
              variant="outline"
            />
            <Filter
              label=""
              items={
                filterBy === "category"
                  ? filterCategoryItems
                  : filterStatusItems
              }
              onClick={handleFilterClick}
              variant="text"
            />
          </Grid>

          <Grid item xs={12} lg="auto" className={classes.sortItems}>
            <Typography className={classes.label} variant="h6">
              Sort By
            </Typography>
            <Sort {...sortByMostRecent} onClick={handleSortClicked} />
            <Sort {...sortByDeadline} onClick={handleSortClicked} />
          </Grid>
          <Grid item xs={12} className={classes.chips}>
            {selectedFilters?.map((filterItem) => (
              <Chip
                className={classes.chip}
                value={filterItem.slug}
                label={filterItem.name}
                onDelete={handleChipDelete(filterItem.slug)}
              />
            ))}
            {selectedFilters?.length > 0 && (
              <Chip
                className={classes.chip}
                label="Delete All"
                onDelete={handleDeleteAllFilters}
              />
            )}
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
