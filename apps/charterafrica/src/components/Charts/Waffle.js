import { ResponsiveWaffle } from "@nivo/waffle";
import { animated } from "@react-spring/web";
import React from "react";

import Tooltip from "./Tooltip";

function WaffleCell({
  cell,
  animatedProps,
  borderRadius,
  borderWidth,
  testIdPrefix,
}) {
  return (
    <animated.rect
      x={animatedProps.x}
      y={animatedProps.y}
      width={animatedProps.size}
      height={animatedProps.size}
      rx={borderRadius}
      ry={borderRadius}
      opacity={0.7}
      fill={cell.fill || animatedProps.color}
      stroke={animatedProps.borderColor}
      strokeWidth={borderWidth}
      data-test-id={
        testIdPrefix ? `${testIdPrefix}.cell_${cell.key}` : undefined
      }
    />
  );
}

function WaffleTooltip({ data }) {
  return <Tooltip {...data} />;
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
