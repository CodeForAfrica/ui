import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import propTypes from '../components/propTypes';

import Page from '../components/Page';
import PromisesSection from './sections/PromisesSection';
import PromiseCard from '../components/Promise/Card';
import Layout from '../components/Layout';

import data from '../data/data';

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
          {data.promises.map(promise => (
            <Grid item xs={12} sm={6} md={4}>
              <PromiseCard
                status={promise.status}
                title={promise.title}
                term={promise.term}
                topic={promise.topic}
                slug={promise.slug}
              />
            </Grid>
          ))}
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
