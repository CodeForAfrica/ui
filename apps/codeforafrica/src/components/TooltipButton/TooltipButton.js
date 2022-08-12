/* eslint-env browser */
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const TooltipButton = React.forwardRef(function TooltipButton(props, ref) {
  const { component, tooltip = true, tooltipProps, ...other } = props;
  const Component = component || IconButton;
  const shareBarButton = <Component {...other} ref={ref} />;
  if (!tooltip) {
    return shareBarButton;
  }
  return <Tooltip {...tooltipProps}>{shareBarButton}</Tooltip>;
});

export default TooltipButton;
