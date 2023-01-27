import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

const TooltipButton = React.forwardRef(function TooltipButton(props, ref) {
  const {
    component: componentProp,
    tooltip = true,
    tooltipProps,
    ...other
  } = props;
  const component = componentProp || IconButton;
  const shareBarButton = (
    <Box
      {...other}
      component={component}
      sx={{ height: "24px", ...other?.sx }}
      ref={ref}
    />
  );
  if (!tooltip) {
    return shareBarButton;
  }
  return <Tooltip {...tooltipProps}>{shareBarButton}</Tooltip>;
});

export default TooltipButton;
