import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import Button from "./FilterButton";
import useStyles from "./useStyles";

function Filter({ label, items, onClick, ...props }) {
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
        {items.map((item) => (
          <Button key={item.slug} {...item} onClick={handleClick} />
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
};

Filter.defaultProps = {
  classes: undefined,
  items: undefined,
  label: undefined,
  onClick: undefined,
};

export default Filter;
