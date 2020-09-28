import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgRectChart from "@/promisetracker/components/Hero/ProfileChart/RectChart/SvgRectChart";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));

function ReactChart(...props) {
  const classes = useStyles(props);
  return (
    <Grid container item xs={12} direction="row" classes={classes.root}>
      <SvgRectChart
        rectWidth="150"
        rectHeight="150"
        width="150"
        height="150"
        fill="#145BD5"
        stroke="#1D1D1B"
        strokeWidth={2}
        statusNumber={130}
        status="Completed"
        statusPercentage="25%"
      />
      <SvgRectChart
        rectWidth="150"
        rectHeight="150"
        width="100"
        height="150"
        fill="#84C6E7"
        stroke="#1D1D1B"
        strokeWidth={2}
        statusNumber={90}
        status="In Progress"
        statusPercentage="18%"
      />
      <SvgRectChart
        rectWidth="150"
        rectHeight="150"
        width="100"
        height="150"
        fill="#909090"
        stroke="#1D1D1B"
        strokeWidth={2}
        statusNumber={70}
        status="Inconclusive"
        statusPercentage="14%"
      />
      <SvgRectChart
        rectWidth="150"
        rectHeight="150"
        width="100"
        height="150"
        fill="#EBEBEB"
        stroke="#1D1D1B"
        strokeWidth={2}
        statusNumber={50}
        status="Unstarted"
        statusPercentage="10%"
      />
      <SvgRectChart
        rectWidth="150"
        rectHeight="150"
        width="100"
        height="150"
        fill="#FFB322"
        stroke="#1D1D1B"
        strokeWidth={2}
        statusNumber={60}
        status="Delayed"
        statusPercentage="12%"
      />
      <SvgRectChart
        rectWidth="150"
        rectHeight="150"
        width="100"
        height="150"
        fill="#FF5154"
        stroke="#1D1D1B"
        strokeWidth={2}
        statusNumber={110}
        status="Stalled"
        statusPercentage="22%"
      />
    </Grid>
  );
}

export default ReactChart;
