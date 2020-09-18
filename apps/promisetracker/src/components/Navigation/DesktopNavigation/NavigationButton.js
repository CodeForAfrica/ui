import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Box, ClickAwayListener, Collapse, Popper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkButton from "@/promisetracker/components/Link/Button";
import config from "@/promisetracker/config";

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
      backgroundColor: "unset",
    },
    "&.active": {
      backgroundColor: palette.primary.dark,
      color: "white",
      borderRadius: 0,
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
      background: palette.primary.dark,
      borderRadius: 0,
    },
  },
}));

function NavigationButton({
  active,
  href,
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
  const router = useRouter();
  const { analysisMenu } = config;

  const buttonRef = useRef();
  const [open, setOpen] = useState();
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
    <LinkButton
      onClick={handleToggleOpen}
      disableFocusRipple
      disableRipple
      href={href}
      size={size}
      {...props}
      variant={active || open ? "outlined" : null}
      ref={buttonRef}
      className={open || active ? classes.currentButton : classes.button}
    >
      {title}
    </LinkButton>
  );
  useEffect(() => {
    setOpen(openProp);
    analysisMenu.forEach((item) => {
      if (router.asPath === `/analysis/${item.href}`) {
        setOpen((prevOpen) => !prevOpen);
        return router.push(`/analysis/${item.href}`, undefined, {
          shallow: true,
        });
      }
      return null;
    });
  }, [openProp]);

  useEffect(() => {}, [router.query]);

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
  href: PropTypes.string,
};

NavigationButton.defaultProps = {
  active: false,
  anchorEl: false,
  onClose: undefined,
  open: false,
  popperProps: undefined,
  button: undefined,
  title: undefined,
  size: undefined,
  children: undefined,
  href: undefined,
};
export default NavigationButton;
