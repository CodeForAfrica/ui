import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
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
function Sort({ categories, onButtonClick, ...props }) {
  const classes = useStyles(props);
  return (
    <>
      {categories.map((sort) => (
        <Button
          key={sort.name}
          value={sort.slug}
          onClick={() => onButtonClick(sort.slug)}
          variant="text"
          className={classes.sort}
        >
          {sort.name}
        </Button>
      ))}
    </>
  );
}

Sort.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  onButtonClick: PropTypes.func,
};

Sort.defaultProps = {
  classes: undefined,
  categories: undefined,
  onButtonClick: undefined,
};

export default Sort;
