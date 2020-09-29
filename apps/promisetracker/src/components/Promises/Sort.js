import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  label: {
    color: palette.secondary.dark,
  },
  root: {},
  sortItems: {
    alignItems: "start",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  sort: {
    marginRight: ".5rem",
    marginBottom: ".4rem",
    paddingLeft: "0rem",
    paddingRight: "0rem",
    borderBottom: `.12rem solid ${palette.primary.dark}`,
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
  },
}));
function Sort({ categories, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="h6">
        Sort By
      </Typography>
      <div className={classes.sortItems}>
        {categories.map((sort) => (
          <Button key={sort.name} variant="text" className={classes.sort}>
            {sort.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

Sort.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

Sort.defaultProps = {
  classes: undefined,
  categories: [
    {
      name: "Most Recent",
    },

    {
      name: "Promise Deadline",
    },
  ],
};

export default Sort;
