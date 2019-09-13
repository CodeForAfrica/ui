import React, { useState } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';

import { Grid, Typography, makeStyles } from '@material-ui/core';

const statusColors = {
  achieved: 'rgb(50, 112, 174)',
  compromised: 'rgb(112, 68, 135)',
  'in-progress': 'rgb(38, 143, 130)',
  'not-achieved': 'rgb(221, 87, 84)',
  stalled: 'rgb(216, 159, 67)',
  inactive: 'rgb(141, 141, 141)'
};

const promises = [
  {
    status: 'achieved',
    name: 'Achieved',
    value: 14
  },
  {
    status: 'compromised',
    name: 'Compromised',
    value: 8
  },
  {
    status: 'in-progress',
    name: 'In Progress',
    value: 11
  },
  {
    status: 'not-achieved',
    name: 'Not Achieved',
    value: 45
  },
  {
    status: 'stalled',
    name: 'Stalled',
    value: 12
  },
  {
    status: 'inactive',
    name: 'Inactive',
    value: 10
  }
];

const totalPromises = promises.reduce((a, b) => a + b.value, 0);

function PercentageLabelFormatter(value) {
  return `${((Number(value) * 100) / totalPromises).toFixed(0)}%`;
}

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  centerTextGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0
  },
  centerNumberTypography: {
    fontSize: '65px',
    color: 'black',
    lineHeight: '65px'
  },
  centerTextTypography: {
    fontSize: '25px',
    color: 'black',
    lineHeight: '25px'
  },
  centerStatusTextTypography: {
    fontSize: '15px',
    color: 'black',
    lineHeight: '15px'
  },
  percentageLabel: {
    pointerEvents: 'none'
  }
});

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
        <Typography className={classes.centerNumberTypography}>
          {activeData ? activeData.value : totalPromises}
        </Typography>
        <Typography className={classes.centerTextTypography}>
          Promises
        </Typography>
        {activeData && (
          <Typography className={classes.centerStatusTextTypography}>
            {activeData.name}
          </Typography>
        )}
      </Grid>
      <PieChart width={255} height={255}>
        <Pie
          blendStroke
          isAnimationActive={false}
          data={promises}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={255 / 2}
          innerRadius={75}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {promises.map(promise => (
            <Cell key={promise.status} fill={statusColors[promise.status]} />
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
