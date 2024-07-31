/* eslint-env browser */
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Tooltip from "./Tooltip"; // Import your ChartTooltip component

function ChartTooltip({
  id,
  geoCode,
  value,
  itemColor,
  title,
  formattedValue,
  event,
  position,
  ...props
}) {
  const { tooltipRef } = props;
  const { x, y } = position;
  useEffect(() => {
    const el = document.createElement("div");
    el.className = `charttooltip-${id}-${geoCode}`;
    document.body.appendChild(el);
    tooltipRef.current = el;

    const tooltipContainer = document.fullscreenElement || document.body;
    tooltipContainer.appendChild(el);

    return () => {
      if (el) {
        el.remove();
      }
    };
  }, [id, geoCode, tooltipRef]);

  useEffect(() => {
    if (tooltipRef.current && value) {
      tooltipRef.current.style.top = `${y}px`;
      tooltipRef.current.style.left = `${x}px`;
      tooltipRef.current.style.zIndex = 1230;
      tooltipRef.current.style.position = "absolute";
    }
  }, [value, event, x, y, tooltipRef]);

  if (!tooltipRef.current || !value) {
    return null;
  }

  return ReactDOM.createPortal(
    <StyledEngineProvider injectFirst>
      <Tooltip
        title={title}
        value={value.count}
        formattedValue={formattedValue}
        item={value?.category}
        itemColor={itemColor}
        {...props}
      />
    </StyledEngineProvider>,
    tooltipRef.current,
  );
}

export default ChartTooltip;
