import { Link } from "@commons-ui/next";
import { CardActionArea } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {},
  focusHighlight: {
    background: "transparent",
  },
  focusVisible: {},
}));

function ActionArea({ href, children, onClick, ...props }) {
  const classes = useStyles(props);

  if (!(href || onClick)) {
    return children;
  }
  return (
    <CardActionArea
      component={href ? Link : undefined}
      color="textPrimary"
      underline="none"
      {...props}
      href={href}
      onClick={onClick}
      classes={{
        root: classes.root,
        focusHighlight: classes.focusHighlight,
        focusVisible: classes.focusVisible,
      }}
    >
      {children}
    </CardActionArea>
  );
}

ActionArea.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default ActionArea;
