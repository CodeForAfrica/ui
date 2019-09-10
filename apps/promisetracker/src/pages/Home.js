import React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';
import StatusIndicator from '../components/StatusIndicator';
import Layout from '../components/Layout';

function Home() {
  return (
    <Page>
      <Layout>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <StatusIndicator status="achieved" value={11} />
          </Grid>
          <Grid item>
            <StatusIndicator status="compromised" value={11} />
          </Grid>
          <Grid item>
            <StatusIndicator status="in-progress" value={11} />
          </Grid>
          <Grid item>
            <StatusIndicator status="not-achieved" value={11} />
          </Grid>
          <Grid item>
            <StatusIndicator status="stalled" value={11} />
          </Grid>
          <Grid item>
            <StatusIndicator status="inactive" value={11} />
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

export default Home;
