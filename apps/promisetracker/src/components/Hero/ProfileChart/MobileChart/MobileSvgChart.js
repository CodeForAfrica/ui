import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    paddingLeft: "1rem",
  },
  status: {
    fontWeight: "normal",
    textTransform: "capitalize",
    padding: "0rem 0.5rem",
    whiteSpace: "normal",
    paddingBottom: "0.5rem",
    [breakpoints.up("sm")]: {
      whiteSpace: "nowrap",
      paddingBottom: 0,
    },
    fontSize: typography.pxToRem(13),
  },
  h3: {
    fontSize: typography.pxToRem(16),
  },
}));

function MobileSvgChart({
  fill,
  stroke,
  strokeWidth,
  statusNumber,
  statusPercentage,
  status,
  ...props
}) {
  const classes = useStyles(props);
  const statusPercentage = totalPromises
    ? (statusNumber / totalPromises) * 100
    : 0;

  return (
    <Grid
      container
      direction="row"
      xs={12}
      item
      jusify="space-between"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid item xs={3}>
        <svg width={25} height={25}>
          <circle
            cx={12.5}
            cy={12.5}
            r={10}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" className={classes.h3}>
          {statusNumber}
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h3" className={classes.h3}>
          ({Math.round(statusPercentage)}%)
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h4" className={classes.status}>
          {status}
        </Typography>
      </Grid>
    </Grid>
  );
}

MobileSvgChart.propTypes = {
  fill: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  statusNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  statusPercentage: PropTypes.string.isRequired,
};

export default MobileSvgChart;
