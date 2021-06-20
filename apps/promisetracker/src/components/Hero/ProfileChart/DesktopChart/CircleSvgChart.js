import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

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
  totalPromises,
  ...props
}) {
  const classes = useStyles(props);
  const currentStatusPercentage = (currentStatusNumber / totalPromises) * 100;
  const radius = (currentStatusPercentage * size) / 200;

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
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  currentStatusNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalPromises: PropTypes.number.isRequired,
};

export default CircleSvgChart;
