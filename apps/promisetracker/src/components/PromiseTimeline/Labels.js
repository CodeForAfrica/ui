import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const Labels = ({ duration }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const firstLabel = (
    <>
      <circle
        cx="8"
        cy="70"
        r="8"
        stroke="#F7F7F7"
        strokeWidth="3"
        fill="#202020"
      />
      <text
        x="8"
        y="120"
        stroke="#202020"
        strokeWidth=".2"
        fontFamily={theme.typography.body2.fontFamily}
        fontSize={theme.typography.body2.fontSize}
      >
        {duration[0]}
      </text>
    </>
  );
  const lastLabel = (
    <>
      <circle
        cx="99%"
        cy="70"
        r="8"
        stroke="#F7F7F7"
        strokeWidth="3"
        fill="#EBEBEB"
      />
      <text
        x="99.4%"
        y="120"
        stroke="#202020"
        strokeWidth=".2"
        fontFamily={theme.typography.body2.fontFamily}
        fontSize={theme.typography.body2.fontSize}
        textAnchor="end"
      >
        {duration[1]}
      </text>
    </>
  );
  let labels = [];
  if (isDesktop) {
    labels = Array(duration[1] - duration[0] - 1)
      .fill()
      .map((_, idx) => duration[0] + 1 + idx)
      .map((year, i) => (
        <React.Fragment key={year}>
          <circle
            cx={`${((i + 1) * 100) / (duration[1] - duration[0])}%`}
            cy="70"
            r="4"
            stroke="#F7F7F7"
            strokeWidth="1"
            fill="#202020"
          />
          <text
            x={`${((i + 1) * 100) / (duration[1] - duration[0])}%`}
            y="120"
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

Labels.propTypes = {
  duration: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Labels;
