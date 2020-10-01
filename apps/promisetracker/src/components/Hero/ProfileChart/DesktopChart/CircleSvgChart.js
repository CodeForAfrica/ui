import React from "react";

import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette }) => ({
  h6: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.pxToRem(24),
    lineHeight: 1,
    color: palette.primary.dark,
  },
  h4: {
    fontSize: typography.pxToRem(12),
    textTransform: "Capitalize",
    fontWeight: "normal",
    color: palette.primary.main,
  },
  percentage: {
    fontSize: typography.pxToRem(12),
    fontWeight: "normal",
    color: "#909090",
  },
  typography: {
    textAlign: "center",
    paddingTop: "1.5rem",
  },
}));

function CircleSvgChart({
  size,
  cx,
  cy,
  fill,
  stroke,
  strokeWidth,
  currentStatusNumber,
  status,
  ...props
}) {
  const classes = useStyles(props);
  const totalStatus = 510;
  const currentStatusPercentage = (currentStatusNumber / totalStatus) * 100;
  const radius = (currentStatusNumber * size) / 130 / 2;

  return (
    <div>
      <svg width={size} height={size}>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={classes.typography}>
        <Typography variant="h6" className={classes.h6}>
          {currentStatusNumber}
        </Typography>
        <Typography variant="h4" className={classes.h4}>
          {status}
        </Typography>
        <Typography variant="h6" className={classes.percentage}>
          {Math.round(currentStatusPercentage)}%
        </Typography>
      </div>
    </div>
  );
}

CircleSvgChart.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  size: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  currentStatusNumber: PropTypes.number,
  status: PropTypes.string,
};

CircleSvgChart.defaultProps = {
  cx: undefined,
  cy: undefined,
  size: undefined,
  fill: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  currentStatusNumber: undefined,
  status: undefined,
};

export default CircleSvgChart;
