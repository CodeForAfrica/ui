import React, { useRef } from "react";
import PropTypes from "prop-types";

import LinkButton from "@/promisetracker/components/Link/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    border: 0,
    color: palette.primary.main,
    padding: "0.8rem ",
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    letterSpacing: "0.56px",
    fontWeight: 600,
    fontSize: typography.pxToRem(14),
    "&:hover": {
      border: 0,
    },
    "&.active": {
      backgroundColor: palette.primary.dark,
      color: "white",
      borderRadius: 0,
    },
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
