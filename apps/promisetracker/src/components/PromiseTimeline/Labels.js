import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import config from "@/promisetracker/config";

const Labels = () => {
  const interval = config.promiseInterval;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const firstLabel = (
    <>
      <circle
        cx="8"
        cy="70"
        r="8"
        stroke="#F7F7F7"
        strokeWidth="1"
        fill="#202020"
      />
      <text
        x="0"
        y="86"
        dominantBaseline="hanging"
        stroke="#202020"
        strokeWidth=".2"
        fontFamily={theme.typography.body2.fontFamily}
        fontSize={theme.typography.body2.fontSize}
      >
        {interval[0]}
      </text>
    </>
  );
  const lastLabel = (
    <>
      <circle
        cx="100%"
        cy="70"
        r="8"
        stroke="#F7F7F7"
        strokeWidth="1"
        fill="#EBEBEB"
      />
      <text
        x="100%"
        y="86"
        dominantBaseline="hanging"
        stroke="#202020"
        strokeWidth=".2"
        fontFamily={theme.typography.body2.fontFamily}
        fontSize={theme.typography.body2.fontSize}
        textAnchor="end"
      >
        {interval[1]}
      </text>
    </>
  );
  let labels = [];
  if (isDesktop) {
    labels = Array(interval[1] - interval[0] - 1)
      .fill()
      .map((_, idx) => interval[0] + 1 + idx)
      .map((year, i) => (
        <React.Fragment key={year}>
          <circle
            cx={`${((i + 1) * 100) / (interval[1] - interval[0])}%`}
            cy="70"
            r="4"
            stroke="#F7F7F7"
            strokeWidth="1"
            fill="#202020"
          />
          <text
            x={`${((i + 1) * 100) / (interval[1] - interval[0])}%`}
            y="86"
            dominantBaseline="hanging"
            stroke="#202020"
            strokeWidth=".2"
            fontFamily={theme.typography.body2.fontFamily}
            fontSize={theme.typography.body2.fontSize}
          >
            {year}
          </text>
        </React.Fragment>
      ));
  }

  return (
    <>
      {firstLabel}
      {labels}
      {lastLabel}
    </>
  );
};

export default Labels;
