import React from 'react';

import dynamic from 'next/dynamic';

import { makeStyles, useTheme } from '@material-ui/core';

import config from '../config';
import propTypes from './propTypes';

const PieChart = dynamic(
  () => import('@codeforafrica/hurumap-ui/core/PieChart'),
  {
    ssr: false
  }
);

const useStyles = makeStyles({
  root: {
    marginTop: '2rem',
    position: 'relative'
  }
});

function StatusChart({ promiseStatuses, ...props }) {
  const classes = useStyles();
  const { chart: originalTheme } = useTheme();

  const totalPromises = promiseStatuses.reduce(
    (acc, cur) => acc + cur.count,
    0
  );
  const data = promiseStatuses.map(pS => {
    const x = pS.name;
    const y = Math.ceil((pS.count * 100) / totalPromises);
    const label = `${pS.count} Promise(s) ${x}`;
    const donutLabel = `${x}\n${y}%`;
    return { donutLabel, label, x, y };
  });
  const colorScale = promiseStatuses.map(pS => config.colors[pS.slug].light);
  const theme = { ...originalTheme };
  theme.pie.colorScale = colorScale;

  if (!data.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <PieChart {...props} data={data} theme={theme} />
    </div>
  );
}

StatusChart.propTypes = {
  promiseStatuses: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      slug: propTypes.oneOf([
        'complete',
        'behind-schedule',
        'unstarted',
        'in-progress',
        'stalled',
        'inconclusive',
        ''
      ]),
      count: propTypes.number
    })
  ).isRequired
};

export default StatusChart;
