import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    alignItems: "start",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  sort: {
    marginRight: ".5rem",
    marginBottom: ".4rem",
    borderBottom: `.12rem solid ${palette.primary.dark}`,
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
  },
}));
function Sort({ categories, ...props }) {
  const classes = useStyles(props);
  return (
    <>
      <Typography className={classes.label} variant="h6">
        Sort By
      </Typography>
      <div className={classes.root}>
        {categories.map((sort) => (
          <Typography key={sort.name} variant="h6" className={classes.sort}>
            {sort.name}
          </Typography>
        ))}
      </div>
    </>
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
