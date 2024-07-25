import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import Tooltip from "./Tooltip"; // Import your ChartTooltip component

function calculateTooltipPosition(event, tooltipBox, offsetX, offsetY) {
  let x = event.pageX + offsetX;
  /* eslint-env browser */
  if (x + tooltipBox.width > window.innerWidth) {
    x = +event.pageX - offsetX - tooltipBox.width;
  }
  let y = event.pageY + offsetY;
  /* eslint-env browser */
  if (y < window.innerHeight) {
    /* eslint-env browser */
    y = window.innerHeight + offsetY;
  }
  /* eslint-env browser */
  if (y + tooltipBox.height > window.innerHeight) {
    y = +event.pageY - offsetY - tooltipBox.height;
  }
  return { x, y };
}

function ChartTooltip({
  id,
  geoCode,
  value,
  itemColor,
  title,
  formattedValue,
  event,
}) {
  const tooltipRef = useRef();

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
  }, [id, geoCode]);

  useEffect(() => {
    if (tooltipRef.current && value) {
      const { x, y } = calculateTooltipPosition(
        event,
        tooltipRef.current.getBoundingClientRect(),
        0,
        10,
      );
      tooltipRef.current.style.top = `${y}px`;
      tooltipRef.current.style.left = `${x}px`;
      tooltipRef.current.style.zIndex = 1230;
      tooltipRef.current.style.position = "absolute";
    }
  }, [value, event]);

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
      />
    </StyledEngineProvider>,
    tooltipRef.current,
  );
}

export default ChartTooltip;
