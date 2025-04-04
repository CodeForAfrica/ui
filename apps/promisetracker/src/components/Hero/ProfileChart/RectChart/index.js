import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";

import RectSvgChart from "@/promisetracker/components/Hero/ProfileChart/RectChart/RectSvgChart";

const useStyles = makeStyles(() => ({
  root: {
    width: "90%",
  },
}));

function ReactChart({
  totalPromises = 0,
  completed = 0,
  inconclusive = 0,
  inProgress = 0,
  unstarted = 0,
  stalled = 0,
  behindSchedule = 0,
  ...props
}) {
  const classes = useStyles(props);
  const rectChartContainerRef = useRef();
  const [chartContainerWidth, setChartContainerWidth] = useState();

  useEffect(() => {
    setChartContainerWidth(rectChartContainerRef.current.offsetWidth);
  }, []);

  return (
    <Grid
      container
      ref={rectChartContainerRef}
      item
      xs={12}
      direction="row"
      className={classes.root}
    >
      <RectSvgChart
        width={130}
        height={160}
        fill="#145BD5"
        stroke="#1D1D1B"
        strokeWidth={1}
        containerWidth={chartContainerWidth}
        totalPromises={totalPromises}
        currentStatusNumber={completed}
        status="Completed"
      />
      <RectSvgChart
        width={90}
        height={160}
        fill="#84C6E7"
        stroke="#1D1D1B"
        strokeWidth={1}
        containerWidth={chartContainerWidth}
        totalPromises={totalPromises}
        currentStatusNumber={inProgress}
        status="In Progress"
      />
      <RectSvgChart
        width={70}
        height={160}
        fill="#909090"
        stroke="#1D1D1B"
        strokeWidth={1}
        containerWidth={chartContainerWidth}
        totalPromises={totalPromises}
        currentStatusNumber={inconclusive}
        status="Inconclusive"
      />
      <RectSvgChart
        width={50}
        height={160}
        fill="#EBEBEB"
        stroke="#1D1D1B"
        strokeWidth={1}
        containerWidth={chartContainerWidth}
        totalPromises={totalPromises}
        currentStatusNumber={unstarted}
        status="Unstarted"
      />
      <RectSvgChart
        width={60}
        height={160}
        fill="#FFB322"
        stroke="#1D1D1B"
        strokeWidth={1}
        containerWidth={chartContainerWidth}
        totalPromises={totalPromises}
        currentStatusNumber={behindSchedule}
        status="Behind Schedule"
      />
      <RectSvgChart
        width={110}
        height={160}
        fill="#FF5154"
        stroke="#1D1D1B"
        strokeWidth={1}
        containerWidth={chartContainerWidth}
        totalPromises={totalPromises}
        currentStatusNumber={stalled}
        status="Stalled"
      />
    </Grid>
  );
}

ReactChart.propTypes = {
  behindSchedule: PropTypes.number,
  stalled: PropTypes.number,
  inconclusive: PropTypes.number,
  completed: PropTypes.number,
  inProgress: PropTypes.number,
  totalPromises: PropTypes.number,
  unstarted: PropTypes.number,
};

export default ReactChart;
