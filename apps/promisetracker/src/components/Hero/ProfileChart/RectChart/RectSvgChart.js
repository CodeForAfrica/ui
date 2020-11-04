import React from "react";

import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    maxWidth: "100%",
  },
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
    paddingTop: "0.8rem ",
  },
}));

function RectSvgChart({
  fill,
  height,
  stroke,
  strokeWidth,
  currentStatusNumber,
  status,
  totalPromises,
  containerWidth,
  ...props
}) {
  if (!currentStatusNumber) {
    return null;
  }
  const classes = useStyles(props);
  const currentStatusPercentage = (currentStatusNumber / totalPromises) * 100;
  const width = (currentStatusPercentage * containerWidth) / 100;

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
          {/* {currentStatusNumber} */}
        </Typography>
      </div>
    </div>
  );
}

RectSvgChart.propTypes = {
  fill: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  currentStatusNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default RectSvgChart;
