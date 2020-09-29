import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  label: {
    color: palette.secondary.dark,
  },
  button: {
    border: `.122rem solid ${palette.primary.dark}`,
    marginRight: ".6rem",
    marginBottom: ".6rem",
    padding: ".5rem .5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    maxWidth: typography.pxToRem(300),
  },
  root: {
    marginBottom: "1.5rem",
    [breakpoints.up("lg")]: {
      marginBottom: 0,
    },
  },
}));
function Filter({ label, filterItems, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="h6">
        {label}
      </Typography>
      <div className={classes.filterContainer}>
        {filterItems.map((filterItem, idx) => (
          <Button
            key={filterItem.name}
            variant={idx === 0 ? "contained" : "outlined"}
            className={classes.button}
          >
            <Typography variant="h6">{filterItem.name}</Typography>
          </Button>
        ))}
      </div>
    </div>
  );
}

Filter.propTypes = {
  classes: PropTypes.shape({
    filterContainer: PropTypes.string,
  }),
  filterItems: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.string,
};

Filter.defaultProps = {
  classes: undefined,
  filterItems: undefined,
  label: undefined,
};

export default Filter;
