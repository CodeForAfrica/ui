import React from "react";

import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  root: {},
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
  },
}));

function RectSvgChart({
  fill,
  height,
  stroke,
  strokeWidth,
  currentStatusNumber,
  status,
  ...props
}) {
  const classes = useStyles(props);
  const totalStatus = 510;
  const currentStatusPercentage = (currentStatusNumber / totalStatus) * 100;
  // const width = currentStatusNumber + 15;
  const width = (currentStatusNumber * height) / 130;

  return (
    <div className={classes.root}>
      <svg width={width} height={height}>
        <rect
          x="0"
          y="0"
          rx="5"
          ry="5"
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={classes.typography}>
        <Typography variant="h6" className={classes.h6}>
          {Math.round(currentStatusPercentage)}%
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
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  currentStatusNumber: PropTypes.number,
  status: PropTypes.string,
};

RectSvgChart.defaultProps = {
  fill: undefined,
  stroke: undefined,
  height: undefined,
  strokeWidth: undefined,
  currentStatusNumber: undefined,
  status: undefined,
};

export default RectSvgChart;
