import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  ClickAwayListener,
  Collapse,
  Popper,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: spacing(2),
  },
  popper: {
    marginTop: typography.pxToRem(34),
    width: "100%",
    zIndex: 9999,
  },
  button: {
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
      backgroundColor: palette.secondary.light,
    },
  },
  currentButton: {
    background: palette.primary.dark,
    borderRadius: 0,
    padding: "0.8rem ",
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    letterSpacing: "0.56px",
    fontWeight: 600,
    fontSize: typography.pxToRem(14),
    "&:hover": {
      border: 0,
      background: palette.primary.dark,
      color: palette.background.default,
    },
  },
}));

function NavigationButton({
  active,
  anchorEl,
  button: buttonProp,
  children,
  open: openProp,
  onClose,
  popperProps,
  size,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const buttonRef = useRef();
  const [open, setOpen] = useState(openProp);
  const handleToggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (e) => {
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };
  const button = buttonProp || (
    <Button
      onClick={handleToggleOpen}
      disableFocusRipple
      disableRipple
      size={size}
      {...props}
      variant={active || open ? "contained" : null}
      ref={buttonRef}
      className={open || active ? classes.currentButton : classes.button}
    >
      {title}
    </Button>
  );

  return (
    <>
      {button}
      <Popper
        open={!active && open}
        anchorEl={anchorEl || buttonRef.current}
        role={undefined}
        transition
        disablePortal
        {...popperProps}
        className={classes.popper}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={onClose || handleClose}>
            <Collapse {...TransitionProps}>
              {/* We need component that can forwardRef here */}
              <Box>{children}</Box>
            </Collapse>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

NavigationButton.propTypes = {
  active: PropTypes.bool,
  anchorEl: PropTypes.shape({}),
  onClose: PropTypes.func,
  open: PropTypes.bool,
  popperProps: PropTypes.shape({}),
  button: PropTypes.shape({}),
  children: PropTypes.shape({}),
  title: PropTypes.string,
  size: PropTypes.string,
};

NavigationButton.defaultProps = {
  active: false,
  anchorEl: undefined,
  onClose: undefined,
  open: false,
  popperProps: undefined,
  button: undefined,
  title: undefined,
  size: undefined,
  children: undefined,
};
export default NavigationButton;
