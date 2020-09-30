import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RectSvgChart from "@/promisetracker/components/Hero/ProfileChart/RectChart/RectSvgChart";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));

function ReactChart(...props) {
  const classes = useStyles(props);
  return (
    <Grid container item xs={12} direction="row" className={classes.root}>
      <RectSvgChart
        width={130}
        fill="#145BD5"
        stroke="#1D1D1B"
        strokeWidth={1}
        currentStatusNumber={130}
        status="Completed"
      />
      <RectSvgChart
        width={90}
        fill="#84C6E7"
        stroke="#1D1D1B"
        strokeWidth={1}
        currentStatusNumber={90}
        status="In Progress"
      />
      <RectSvgChart
        width={70}
        fill="#909090"
        stroke="#1D1D1B"
        strokeWidth={1}
        currentStatusNumber={70}
        status="Inconclusive"
      />
      <RectSvgChart
        width={50}
        fill="#EBEBEB"
        stroke="#1D1D1B"
        strokeWidth={1}
        currentStatusNumber={50}
        status="Unstarted"
      />
      <RectSvgChart
        width={60}
        fill="#FFB322"
        stroke="#1D1D1B"
        strokeWidth={1}
        currentStatusNumber={60}
        status="Delayed"
      />
      <RectSvgChart
        width={110}
        fill="#FF5154"
        stroke="#1D1D1B"
        strokeWidth={1}
        currentStatusNumber={110}
        status="Stalled"
      />
    </Grid>
  );
}

export default ReactChart;
