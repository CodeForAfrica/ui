import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MuiPopper from "@mui/material/Popper";
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
