import React, { Fragment } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Head from 'next/head';

import Page from '../component/Page';
import PromisesSection from '../component/PageSections/PromisesSection';
import PromiseCard from '../component/Promise/Card';
import Layout from '../component/Layout';

import { useRouter } from 'next/router';

import data from '../data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 0',
    background: theme.palette.background.paper
  }
}));

function Promises() {

  const classes = useStyles();
  const router = useRouter();

  const params = new URLSearchParams(router.asPath.split(/\?/)[1]);

  return (
    <Fragment>
      <Head>
        <title>Promises - Promise Tracker</title>
      </Head>
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
    </Fragment>
  );
}

export default Promises;


