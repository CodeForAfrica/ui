import React from "react";

import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  h6: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.pxToRem(24),
    lineHeight: 1,
  },
  h4: {
    fontSize: typography.pxToRem(12),
    textTransform: "Capitalize",
    fontWeight: "normal",
  },
  percentage: {
    fontSize: typography.pxToRem(12),
    fontWeight: "normal",
    color: "#909090",
  },
  typography: {
    textAlign: "center",
    padding: "1rem",
  },
}));

function RectSvgChart({
  fill,
  stroke,
  strokeWidth,
  currentStatusNumber,
  status,
  ...props
}) {
  const classes = useStyles(props);
  const totalStatus = 150;
  const currentStatusPercentage = (currentStatusNumber / totalStatus) * 100;
  const width = currentStatusNumber;

  return (
    <div>
      <svg width={width} height={150}>
        <rect
          rx="5"
          ry="5"
          width={width}
          height={150}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={classes.typography}>
        <Typography variant="h6" className={classes.h6}>
          {Math.trunc(currentStatusPercentage)}%
        </Typography>
        <Typography variant="h4" className={classes.h4}>
          {status}
        </Typography>
        <Typography variant="h6" className={classes.percentage}>
          {currentStatusNumber}
        </Typography>
      </div>
    </div>
  );
}

RectSvgChart.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  currentStatusNumber: PropTypes.number,
  status: PropTypes.string,
};

RectSvgChart.defaultProps = {
  fill: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  currentStatusNumber: undefined,
  status: undefined,
};

export default RectSvgChart;
