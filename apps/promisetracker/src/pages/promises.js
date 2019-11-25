import React from 'react';

import { makeStyles } from '@material-ui/core';

import Head from 'next/head';

import Page from 'components/Page';
import PromisesSection from 'components/PageSections/PromisesSection';
import Layout from 'components/Layout';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 0',
    background: theme.palette.background.paper
  }
}));

function Promises() {
  const classes = useStyles();
  const params = new URL(document.location).searchParams;
  // const params = new URLSearchParams();

  return (
    <>
      <Head>
        <title>Promises - Promise Tracker</title>
      </Head>
      <Page>
        <Layout classes={{ root: classes.root }}>
          <PromisesSection
            enableShowMore={false}
            disableFilterHistory
            color="white"
            filter={{
              status: params.get('status'),
              term: params.get('term'),
              topic: params.get('topic')
            }}
          />
        </Layout>
      </Page>
    </>
  );
}

export default Promises;
