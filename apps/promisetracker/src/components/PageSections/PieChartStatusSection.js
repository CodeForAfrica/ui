import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import { makeStyles, Grid } from '@material-ui/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import chartData from 'data';
import findStatus from 'lib/findStatus';
import slugify from 'lib/slugify';

import Layout from 'components/Layout';
import StatusIndicator from 'components/StatusIndicator';

const PieChart = dynamic(
  () => import('@codeforafrica/hurumap-ui/core/PieChart'),
  {
    ssr: false
  }
);

const useStyles = makeStyles(theme => ({
  root: {
    padding: '3rem 0'
  },
  statusGridRoot: {
    position: 'relative'
  },
  statusGrid: {
    padding: '5rem 0'
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

function PieChartStatusSection({ promises }) {
  const classes = useStyles();

  const promiseStatuses = chartData.statusTypes.map(promise => ({
    ...promise,
    count: 0
  })); // Initialize
  promises.forEach(media => {
    const status = slugify(findStatus(media));
    const promiseStatus = promiseStatuses.find(s => s.slug === status);
    promiseStatus.count += 1;
  });
  const filteredPromisesStatuses = promiseStatuses.filter(pS => pS.count > 0);
  const totalPromises = filteredPromisesStatuses.reduce(
    (a, b) => a + b.count,
    0
  );
  const data = filteredPromisesStatuses.map(pS => {
    const x = pS.name;
    const y = ((pS.count * 100) / totalPromises).toFixed(0);
    const label = `${y}%\n${x}`;
    return { donutLabel: label, label, x, y };
  });
  const [dataIndex, setDataIndex] = useState(0);
  const onMouseEnter = ({ status }) => {
    const foundIndex = filteredPromisesStatuses.findIndex(
      s => s.slug === status
    );
    setDataIndex(foundIndex !== -1 ? foundIndex : 0);
  };
  const onMouseLeave = () => {
    setDataIndex(0);
  };

  return (
    <div className={classes.root}>
      <Layout justify="center">
        <Grid item className={classes.statusGrid}>
          <div className={classes.statusGridRoot}>
            <PieChart data={data} donutLabelKey={{ dataIndex }} />
          </div>
        </Grid>

        <Grid container justifyContent="center">
          {promiseStatuses.map(promise => (
            <Grid key={promise.status} item xs={12} sm={4} md={2}>
              <StatusIndicator
                promise={promise}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export default PieChartStatusSection;
