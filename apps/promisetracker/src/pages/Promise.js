import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import Page from '../components/Page';
import propTypes from '../components/propTypes';
import Layout from '../components/Layout';
import {
  Card as PromiseCard,
  Header as PromiseHeader,
  Navigator as PromiseNavigator,
  TimelineEntry as PromiseTimelineEntry
} from '../components/Promise';
import TitledGrid from '../components/TitledGrid';
import SideBar from '../components/Articles/Sidebar';

const useStyles = makeStyles({
  root: {
    margin: '4rem 0',
    padding: '5rem 0'
  }
});

function PromisePage({
  match: {
    params: { slug }
  }
}) {
  const classes = useStyles();
  console.log(slug);
  /**
   * TODO: Pull data using slug
   */
  return (
    <Page fixNavigation={false}>
      <Layout classes={{ root: classes.root }} spacing={8}>
        <Grid item xs={12} md={8}>
          <PromiseHeader
            status="stalled"
            term="Term 1"
            topic="Domestic policy"
            title="Assuring equal rights for all Iranian ethnicities"
          />
          <Grid item xs={12} style={{ padding: '3rem 0' }}>
            <Divider />
          </Grid>
          <Grid container item direction="column" spacing={8}>
            <TitledGrid
              container
              item
              direction="column"
              spacing={1}
              variant="h4"
              title="Promise Timeline"
            >
              <Grid item>
                <PromiseTimelineEntry
                  defaultExpanded
                  updated="Jul 26, 2019"
                  status="compromised"
                />
              </Grid>
              <Grid item>
                <PromiseTimelineEntry
                  updated="Jul 26, 2019"
                  status="in-progress"
                />
              </Grid>
            </TitledGrid>

            <TitledGrid item variant="h5" title="About the promise">
              <Typography />
            </TitledGrid>

            <Grid item>
              <PromiseNavigator
                previous={{
                  href: '/promises/previous-promise-slug',
                  label:
                    'Civil Rights Charter will be submitted to the parliament as a bill.'
                }}
                next={{
                  href: '/promises/next-promise-slug',
                  label:
                    'Reinstating university professors and administrators dismissed or forced into retirement for their political views.'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ borderLeft: '1px solid grey' }}>
          <Grid container spacing={4}>
            <TitledGrid
              item
              xs={12}
              container
              spacing={2}
              variant="h4"
              title="Related Promises"
            >
              <Grid item xs={12}>
                <PromiseCard
                  status="achieved"
                  title="Provide commodity subsidies for basic goods to support households with low income"
                  term="Term 1"
                  topic="Domestic policy"
                  href="/promises/provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income"
                />
              </Grid>
              <Grid item xs={12}>
                <PromiseCard
                  status="compromised"
                  title="Provide commodity subsidies for basic goods to support households with low income"
                  term="Term 1"
                  topic="Domestic policy"
                  href="/promises/provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income"
                />
              </Grid>
              <Grid item xs={12}>
                <PromiseCard
                  status="not-achieved"
                  title="Provide commodity subsidies for basic goods to support households with low income"
                  term="Term 1"
                  topic="Domestic policy"
                  href="/promises/provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income"
                />
              </Grid>
            </TitledGrid>
            <SideBar />
            <Grid container item>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </Page>
  );
}

PromisePage.propTypes = {
  match: propTypes.match.isRequired
};

export default PromisePage;
