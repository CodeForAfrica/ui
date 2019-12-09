import React from 'react';

import { makeStyles } from '@material-ui/core';

import Head from 'next/head';
import { useRouter } from 'next/router';
import withApollo from 'lib/withApollo';

import Layout from 'components/Layout';
import Page from 'components/Page';
import PromisesSection from 'components/PageSections/PromisesSection';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 0',
    background: theme.palette.background.paper
  }
}));

function Promises() {
  const classes = useStyles();
  const router = useRouter();
  const { status = '', term = '', topic = '' } = router.query;
  const filter = { status, term, topic };

  return (
    <>
      <Head>
        <title>Promises - Promise Tracker</title>
      </Head>
      <Page>
        <Layout classes={{ root: classes.root }}>
          <PromisesSection
            enableShowMore={false}
            color="white"
            filter={filter}
          />
        </Layout>
      </Page>
    </>
  );
}

export default withApollo(Promises);
