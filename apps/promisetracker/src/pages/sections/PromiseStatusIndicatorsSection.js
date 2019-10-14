import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Layout from '../../components/Layout';
import StatusPieChart from '../../components/StatusPieChart';
import StatusIndicator from '../../components/StatusIndicator';

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
          <Grid item xs={8} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-achieved.png')}
              label="Achieved"
              status="achieved"
              value={11}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-compromised.png')}
              label="Compromised"
              status="compromised"
              value={11}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-in-progress.png')}
              label="In Progress"
              status="in-progress"
              value={11}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-not-achieved.png')}
              label="Not Achieved"
              status="not-achieved"
              value={11}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-stalled.png')}
              label="Stalled"
              status="stalled"
              value={11}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-inactive.png')}
              label="Inactive"
              status="inactive"
              value={11}
            />
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}

export default PromiseStatusIndicatorsSection;
