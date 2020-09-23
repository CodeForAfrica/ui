import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  label: {
    color: palette.secondary.dark,
  },
  button: {
    border: `.122rem solid ${palette.primary.dark}`,
    marginRight: ".5rem",
    marginBottom: ".4rem",
    padding: ".5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
}));
function Filter({ label, filterItems, ...props }) {
  const classes = useStyles(props);
  return (
    <>
      <Typography className={classes.label} variant="h6">
        {label}
      </Typography>
      <div className={classes.root}>
        {filterItems.map((filterItem, idx) => (
          <Button
            key={filterItem.name}
            variant={idx === 0 ? "contained" : "outlined"}
            className={classes.button}
          >
            {filterItem.name}
          </Button>
        ))}
      </div>
    </>
  );
}

Filter.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
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
