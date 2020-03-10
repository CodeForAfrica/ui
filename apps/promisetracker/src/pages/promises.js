import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import Page from 'components/Page';
import PromisesSection from 'components/PageSections/PromisesSection';
import fetchPromises from 'lib/fetchPromises';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 0',
    background: theme.palette.background.paper
  }
}));

function Promises({ promises }) {
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
            promises={promises}
            enableShowMore={false}
            color="white"
            filter={filter}
          />
        </Layout>
      </Page>
    </>
  );
}

Promises.getInitialProps = fetchPromises;

export default Promises;
