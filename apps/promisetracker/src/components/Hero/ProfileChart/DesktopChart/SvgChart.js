import React from "react";

import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  h6: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.pxToRem(24),
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
    paddingTop: "0.5rem",
  },
}));

function SvgChart({
  cx,
  cy,
  radius,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  statusNumber,
  status,
  statusPercentage,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <div>
      <svg width={width} height={height}>
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
          {statusNumber}
        </Typography>
        <Typography variant="h4" className={classes.h4}>
          {status}
        </Typography>
        <Typography variant="h6" className={classes.percentage}>
          {statusPercentage}
        </Typography>
      </div>
    </div>
  );
}

SvgChart.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  radius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  statusNumber: PropTypes.number,
  status: PropTypes.string,
  statusPercentage: PropTypes.string,
};

SvgChart.defaultProps = {
  cx: undefined,
  cy: undefined,
  radius: undefined,
  width: undefined,
  height: undefined,
  fill: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  statusNumber: undefined,
  status: undefined,
  statusPercentage: undefined,
};

export default SvgChart;
