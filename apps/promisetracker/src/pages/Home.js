import React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';
import StatusIndicator from '../components/StatusIndicator';
import Layout from '../components/Layout';
import StatusPieChart from '../components/StatusPieChart';

const getIndicatorImage = require.context(
  '../components/assets/images/indicators',
  false,
  /\.png$/
);

function Home() {
  return (
    <Page>
      <Layout justify="center">
        <StatusPieChart />
        <Grid container spacing={2} justify="center">
          <Grid item xs={6} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-achieved.png')}
              label="Achieved"
              status="achieved"
              value={11}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-compromised.png')}
              label="Compromised"
              status="compromised"
              value={11}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-in-progress.png')}
              label="In Progress"
              status="in-progress"
              value={11}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-not-achieved.png')}
              label="Not Achieved"
              status="not-achieved"
              value={11}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-stalled.png')}
              label="Stalled"
              status="stalled"
              value={11}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-inactive.png')}
              label="Inactive"
              status="inactive"
              value={11}
            />
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

export default Home;
