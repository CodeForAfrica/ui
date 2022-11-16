import { ResponsivePie } from "@nivo/pie";
import React from "react";

import Tooltip from "./Tooltip";

import { neutral } from "@/charterafrica/colors";

function PieTooltip({ datum: { id, label, value } }) {
  return <Tooltip label={label || id} value={value} />;
}

function Pie({ data, height, width }) {
  return (
    <ResponsivePie
      data={data}
      defs={[
        {
          id: "opacity",
          type: "linearGradient",
          colors: [
            { offset: 0, color: "inherit", opacity: 0.7 },
            { offset: 100, color: "inherit", opacity: 0.7 },
          ],
        },
      ]}
      borderWidth={1}
      borderColor={neutral[900]}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      height={height}
      width={width}
      fill={[{ match: "*", id: "opacity" }]}
      colors={{ datum: "data.color" }}
      tooltip={PieTooltip}
    />
  );
}

export default Pie;
