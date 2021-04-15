import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    padding: "2rem 0rem",
  },
  caption: (props) => ({
    color: props.color,
    fontSize: typography.pxToRem(14),
    fontStyle: "italic",
    paddingRight: "1rem",
    whiteSpace: "pre-line",
  }),
  border: (props) => ({
    borderRight: props.borderRight,
    height: "3.875rem",
    [breakpoints.up("md")]: {
      height: "3.563rem",
    },
  }),
  chartGrid: {
    paddingLeft: "1rem",
  },
}));

function ProgressChart({ progressStatuses, caption, ...props }) {
  const classes = useStyles({ color: null, borderRight: null, ...props });

  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={4} className={`${classes.border}`}>
        <Typography variant="body2" className={classes.caption}>
          {caption}
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={8}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        {progressStatuses.map((progressStatus) => (
          <MobileSvgChart
            key={progressStatus.title}
            fill={progressStatus.color}
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={progressStatus.count}
            statusPercentage={progressStatus.percentage}
            status={progressStatus.title}
          />
        ))}
      </Grid>
    </Grid>
  );
}
ProgressChart.propTypes = {
  caption: PropTypes.string.isRequired,
  progressStatuses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ProgressChart;
