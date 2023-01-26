import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper as MuiPopper,
} from "@mui/material";
import React from "react";

function Popper({
  children,
  sx,
  ClickAwayListenerProps,
  PaperProps,
  TransitionComponent: TransitionComponentProp,
  TransitionComponentProps,
  ...props
}) {
  const TransitionComponent = TransitionComponentProp || Grow;

  return (
    <MuiPopper
      transition
      disablePortal
      {...props}
      sx={{
        zIndex: 1,
        ...sx,
      }}
    >
      {({ TransitionProps }) => (
        <TransitionComponent {...TransitionProps} {...TransitionComponentProps}>
          <Paper {...PaperProps}>
            <ClickAwayListener {...ClickAwayListenerProps}>
              {children}
            </ClickAwayListener>
          </Paper>
        </TransitionComponent>
      )}
    </MuiPopper>
  );
}

export default Popper;
