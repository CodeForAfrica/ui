import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import LinkButton from "@/promisetracker/components/Link/Button";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    border: 0,
    padding: "0.8rem  1.2rem",
    margin: "0.3rem",
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    letterSpacing: "0.56px",
    fontWeight: 600,
    fontSize: typography.pxToRem(14),
    // Limit text to just one line
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

function MenuButton({ active, size, href, title, ...props }) {
  const classes = useStyles(props);
  const buttonRef = useRef();

  return (
    <LinkButton
      disableFocusRipple
      disableRipple
      size={size}
      href={href}
      {...props}
      variant={active ? "contained" : null}
      ref={buttonRef}
      className={classes.root}
    >
      {title}
    </LinkButton>
  );
}

MenuButton.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  active: PropTypes.bool,
};

MenuButton.defaultProps = {
  size: undefined,
  title: undefined,
  href: undefined,
  active: undefined,
};

export default MenuButton;
