import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Page from '../components/Page';
import PromisesSection from './sections/PromisesSection';
import PromiseCard from '../components/Promise/Card';
import Layout from '../components/Layout';
import propTypes from '../components/propTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 0',
    background: theme.palette.background.paper
  }
}));

function Promises({ location: { search } }) {
  const params = new URLSearchParams(search);
  const classes = useStyles();
  return (
    <Page>
      <Layout classes={{ root: classes.root }}>
        <PromisesSection
          color="white"
          filter={{
            status: params.get('status'),
            term: params.get('term'),
            topic: params.get('topic')
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <PromiseCard
              status="stalled"
              title="Assuring equal rights for all Iranian ethnicities"
              term="Term 1"
              topic="Domestic policy"
              href="/promises/assuring-equal-rights-for-all-iranian-ethnicities"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PromiseCard
              status="achieved"
              title="Provide commodity subsidies for basic goods to support households with low income"
              term="Term 1"
              topic="Domestic policy"
              href="/promises/provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PromiseCard
              status="inactive"
              title="Assuring equal rights for all Iranian ethnicities"
              term="Term 1"
              topic="Domestic policy"
              href="/promises/assuring-equal-rights-for-all-iranian-ethnicities"
            />
          </Grid>
        </PromisesSection>
      </Layout>
    </Page>
  );
}

Promises.propTypes = {
  location: propTypes.shape({
    search: propTypes.string
  }).isRequired
};

export default Promises;
