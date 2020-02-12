import React, { useState } from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import chartData from 'data';
import findStatus from 'lib/findStatus';
import slugify from 'lib/slugify';

import Layout from 'components/Layout';
import StatusChart from 'components/StatusChart';
import StatusIndicator from 'components/StatusIndicator';

const useStyles = makeStyles({
  root: {
    padding: '3rem 0'
  },
  statusIndicator: {
    marginTop: '2rem'
  }
});

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
  const [columnIndex, setColumnIndex] = useState(0);
  const onMouseEnter = ({ status }) => {
    const foundIndex = filteredPromisesStatuses.findIndex(
      s => s.slug === status
    );
    setColumnIndex(foundIndex !== -1 ? foundIndex : 0);
  };
  const onMouseLeave = () => {
    setColumnIndex(0);
  };

  return (
    <div className={classes.root}>
      <Layout justify="center">
        <Grid item className={classes.statusGrid}>
          <StatusChart
            promiseStatuses={filteredPromisesStatuses}
            donutLabelKey={{ columnIndex }}
          />
        </Grid>

        <Grid container justify="center" className={classes.statusIndicator}>
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
