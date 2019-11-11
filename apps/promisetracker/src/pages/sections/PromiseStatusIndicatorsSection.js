import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Layout from '../../components/Layout';
import StatusPieChart from '../../components/StatusPieChart';
import StatusIndicator from '../../components/StatusIndicator';

import data from '../../data/data';

const getIndicatorImage = require.context(
  '../../components/assets/images/indicators',
  false,
  /\.png$/
);

const useStyles = makeStyles({
  root: {
    padding: '3rem 0'
  },
  statusGrid: {
    padding: '5rem 0'
  }
});

function PromiseStatusIndicatorsSection() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout justify="center">
        <Grid item className={classes.statusGrid}>
          <StatusPieChart />
        </Grid>
        <Grid container spacing={2} justify="center">
          {data.chartPromises.map(promise => (
            <Grid item xs={8} sm={4} md={2}>
              <StatusIndicator
                img={getIndicatorImage(promise.img)}
                label={promise.label}
                status={promise.status}
                value={promise.value}
              />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export default PromiseStatusIndicatorsSection;
