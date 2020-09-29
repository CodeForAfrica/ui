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
    paddingTop: "0.5rem",
  },
}));

function SvgReactChart({
  rectWidth,
  rectHeight,
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
        <rect
          rx="5"
          ry="5"
          width={rectWidth}
          height={rectHeight}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={classes.typography}>
        <Typography variant="h6" className={classes.h6}>
          {statusPercentage}
        </Typography>
        <Typography variant="h4" className={classes.h4}>
          {status}
        </Typography>
        <Typography variant="h6" className={classes.percentage}>
          {statusNumber}
        </Typography>
      </div>
    </div>
  );
}

SvgReactChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  rectWidth: PropTypes.number,
  rectHeight: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  statusNumber: PropTypes.number,
  status: PropTypes.string,
  statusPercentage: PropTypes.string,
};

SvgReactChart.defaultProps = {
  width: undefined,
  height: undefined,
  rectWidth: undefined,
  rectHeight: undefined,
  fill: undefined,
  stroke: undefined,
  strokeWidth: undefined,
  statusNumber: undefined,
  status: undefined,
  statusPercentage: undefined,
};

export default SvgReactChart;
