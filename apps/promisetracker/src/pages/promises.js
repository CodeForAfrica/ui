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

  return (
    <>
      <Head>
        <title>Promises - Promise Tracker</title>
      </Head>
      <Page>
        <Layout classes={{ root: classes.root }}>
          <PromisesSection color="white" enableShowMore={false} />
        </Layout>
      </Page>
    </>
  );
}

export default Promises;
