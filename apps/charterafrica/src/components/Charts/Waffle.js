import { ResponsiveWaffle } from "@nivo/waffle";
import React from "react";

import Tooltip from "./Tooltip";

function WaffleCell({
  position,
  size,
  x,
  y,
  color,
  fill,
  borderWidth,
  borderColor,
  data,
  onHover,
  onLeave,
  onClick,
}) {
  return (
    <rect
      width={size}
      height={size}
      x={x}
      y={y}
      fill={fill || color}
      strokeWidth={borderWidth}
      stroke={borderColor}
      opacity={0.7}
      onMouseEnter={onHover}
      onMouseMove={onHover}
      onMouseLeave={onLeave}
      onClick={(event) => {
        onClick({ position, color, x, y, data }, event);
      }}
    />
  );
}

function WaffleTooltip({ id, label, value }) {
  return <Tooltip label={label || id} value={value} />;
}

function Waffle({ data, height, total, width }) {
  return (
    <ResponsiveWaffle
      data={data}
      total={total}
      rows={10}
      columns={10}
      borderColor="#FFFFFF"
      borderWidth={5}
      animate
      colors={{ datum: "color" }}
      fillDirection="top"
      height={height}
      width={width}
      cellComponent={WaffleCell}
      tooltip={WaffleTooltip}
      theme={{
        tooltip: {
          container: {
            background: "none",
            padding: 0,
          },
        },
      }}
    />
  );
}

export default Waffle;
