import React, { useState } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import chartData from '../data';

const totalPromises = chartData.chartPromises.reduce((a, b) => a + b.value, 0);

function PercentageLabelFormatter(value) {
  return `${((Number(value) * 100) / totalPromises).toFixed(0)}%`;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  centerTextGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0
  },
  typo: {
    color: theme.palette.common.black
  },
  percentageLabel: {
    pointerEvents: 'none'
  }
}));

function StatusPieChart() {
  const classes = useStyles();
  const [activeData, setActiveData] = useState(null);
  const onMouseEnter = data => {
    setActiveData(data);
  };
  const onMouseLeave = () => {
    setActiveData(null);
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.centerTextGrid}
      >
        <Typography variant="h6" className={classes.typo}>
          {activeData ? activeData.value : totalPromises}
        </Typography>
        <Typography variant="h6" className={classes.typo}>
          Promises
        </Typography>
        {activeData && (
          <Typography variant="h6" className={classes.typo}>
            {activeData.name}
          </Typography>
        )}
      </Grid>
      <PieChart width={255} height={255}>
        <Pie
          blendStroke
          isAnimationActive={false}
          data={chartData.chartPromises}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          paddingAngle={1}
          outerRadius={255 / 2}
          innerRadius={75}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {chartData.chartPromises.map(promise => (
            <Cell key={promise.status} />
          ))}
          <LabelList
            className={classes.percentageLabel}
            dataKey="value"
            position="insideTop"
            formatter={PercentageLabelFormatter}
          />
        </Pie>
      </PieChart>
    </div>
  );
}

export default StatusPieChart;
