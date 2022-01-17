import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import Button from "./FilterButton";
import useStyles from "./useStyles";

import Sort from "@/promisetracker/components/Promises/Sort";

function Filter({ label, items, onClick, variant, ...props }) {
  const classes = useStyles(props);

  const handleClick = (slug) => {
    if (onClick) {
      onClick(slug);
    }
  };

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="h6">
        {label}
      </Typography>
      <div className={classes.filterContainer}>
        {variant === "text"
          ? items.map((item) => (
              <Sort
                key={item.slug}
                onClick={handleClick}
                name={item.name}
                slug={item.slug}
              />
            ))
          : items.map((item) => (
              <Button
                variant={variant}
                key={item.slug}
                {...item}
                onClick={handleClick}
              />
            ))}
      </div>
    </div>
  );
}

Filter.propTypes = {
  classes: PropTypes.shape({
    filterContainer: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

Filter.defaultProps = {
  classes: undefined,
  items: undefined,
  label: undefined,
  onClick: undefined,
  variant: undefined,
};

export default Filter;
