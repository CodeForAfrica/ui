import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgRectChart from "@/promisetracker/components/Hero/ProfileChart/RectChart/SvgRectChart";

const useStyles = makeStyles(() => ({
  root: {},
}));

function ReactChart(props) {
  const classes = useStyles(props);
  return (
    <Grid data-user="123" container item direction="row" classes={classes.root}>
      <SvgRectChart
        rectWidth="100"
        rectHeight="100"
        width="100"
        height="100"
        fill="#145BD5"
        strokeWidth={1}
        statusNumber={130}
        status="Completed"
        statusPercentage="25%"
      />
      <SvgRectChart
        rectWidth="100"
        rectHeight="100"
        width="100"
        height="100"
        fill="#84C6E7"
        strokeWidth={1}
        statusNumber={90}
        status="In Progress"
        statusPercentage="18%"
      />
      <SvgRectChart
        rectWidth="100"
        rectHeight="100"
        width="100"
        height="100"
        fill="#909090"
        strokeWidth={1}
        statusNumber={70}
        status="Inconclusive"
        statusPercentage="14%"
      />
      <SvgRectChart
        rectWidth="100"
        rectHeight="100"
        width="100"
        height="100"
        fill="#EBEBEB"
        strokeWidth={1}
        statusNumber={50}
        status="Unstarted"
        statusPercentage="10%"
      />
      <SvgRectChart
        rectWidth="100"
        rectHeight="100"
        width="100"
        height="100"
        fill="#FFB322"
        strokeWidth={1}
        statusNumber={60}
        status="Delayed"
        statusPercentage="12%"
      />
      <SvgRectChart
        rectWidth="100"
        rectHeight="100"
        width="100"
        height="100"
        fill="#FF5154"
        strokeWidth={1}
        statusNumber={110}
        status="Stalled"
        statusPercentage="22%"
      />
    </Grid>
  );
}

export default ReactChart;
