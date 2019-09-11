import React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';
import StatusIndicator from '../components/StatusIndicator';
import Layout from '../components/Layout';

const getIndicatorImage = require.context(
  '../components/assets/images/indicators',
  false,
  /\.png$/
);

function Home() {
  return (
    <Page>
      <Layout>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-achieved.png')}
              status="achieved"
              value={11}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-compromised.png')}
              status="compromised"
              value={11}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-in-progress.png')}
              status="in-progress"
              value={11}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-not-achieved.png')}
              status="not-achieved"
              value={11}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-stalled.png')}
              status="stalled"
              value={11}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatusIndicator
              img={getIndicatorImage('./status-inactive.png')}
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
