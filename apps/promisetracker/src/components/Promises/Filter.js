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
    "&:hover": {
      marginRight: ".6rem",
      marginBottom: ".6rem",
      padding: ".5rem .5rem",
      border: `.122rem solid ${palette.primary.dark}`,
    },
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
function Filter({ label, filterItems, selected, onButtonClick, ...props }) {
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
            value={filterItem.slug}
            // onClick={() => setSelected(console.log(filterItem.slug))}
            onClick={() => onButtonClick(filterItem.slug)}
            variant={idx ? "contained" : "outlined"}
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
  selected: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Filter.defaultProps = {
  classes: undefined,
  filterItems: undefined,
  label: undefined,
  selected: undefined,
  onButtonClick: undefined,
};

export default Filter;
