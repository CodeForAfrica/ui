import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Page from '../component/Page';
import PromisesSection from '../component/PageSections/PromisesSection';
import PromiseCard from '../component/Promise/Card';
import Layout from '../component/Layout';

import { useRouter, Router } from 'next/router';

import data from '../data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 0',
    background: theme.palette.background.paper
  }
}));

function Promises() {
  const params = new URLSearchParams(Router.asPath);
  const classes = useStyles();
  const router = useRouter();

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

export default Promises;


