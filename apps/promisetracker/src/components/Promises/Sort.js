import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  root: {
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

function Sort({ name, onClick, slug, ...props }) {
  const classes = useStyles(props);
  const handleClick = () => {
    if (onClick) {
      onClick(slug);
    }
  };

  return (
    <Button
      key={slug}
      onClick={handleClick}
      variant="text"
      className={classes.root}
    >
      {name}
    </Button>
  );
}

Sort.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  slug: PropTypes.string.isRequired,
};

Sort.defaultProps = {
  onClick: undefined,
};

export default Sort;
