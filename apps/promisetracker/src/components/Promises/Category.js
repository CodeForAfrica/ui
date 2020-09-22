import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  category: {
    marginRight: ".5rem",
    marginBottom: ".4rem",
    padding: ".2rem .5rem",
    border: `.122rem solid ${palette.primary.dark}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function Category({ categories, ...props }) {
  const classes = useStyles(props);
  return (
    <>
      <Typography className={classes.label} variant="h6">
        Promises by category
      </Typography>
      <div className={classes.root}>
        {categories.map((category) => (
          <Typography
            key={category.name}
            variant="h6"
            className={classes.category}
          >
            {category.name}
          </Typography>
        ))}
      </div>
    </>
  );
}

Category.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

Category.defaultProps = {
  classes: undefined,
  categories: [
    {
      name: "Immigration",
    },

    {
      name: "Trade",
    },
    {
      name: "Economy",
    },
    {
      name: "Government",
    },
    {
      name: "Environment",
    },
    {
      name: "Energy",
    },
  ],
};

export default Category;
