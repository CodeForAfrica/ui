import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import CircleSvgChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/CircleSvgChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    margin: "0.5rem",
  },
  typo: (props) => ({
    textAlign: "center",
    borderBottom: props.borderBottom,
  }),
  caption: (props) => ({
    color: props.color,
    fontStyle: "italic",
  }),
  circleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem 0rem",
  },
  divider: {
    margin: "2rem 1rem 1rem 1rem",
    height: typography.pxToRem(200),
  },
}));

function ProgressChart({ progressStatuses, caption, ...props }) {
  const classes = useStyles({ color: null, borderBottom: null, ...props });

  return (
    <Grid item xs={3} className={classes.root}>
      <div className={`${classes.typo}`}>
        <Typography variant="caption" className={classes.caption}>
          {caption}
        </Typography>
      </div>
      <div className={classes.circleContainer}>
        {progressStatuses.map((progressStatus) => (
          <CircleSvgChart
            key={progressStatus.title}
            cx={50}
            cy={50}
            size={100}
            fill={progressStatus.color}
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={progressStatus.count}
            status={progressStatus.title}
          />
        ))}
      </div>
    </Grid>
  );
}

ProgressChart.propTypes = {
  caption: PropTypes.string.isRequired,
  progressStatuses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ProgressChart;
