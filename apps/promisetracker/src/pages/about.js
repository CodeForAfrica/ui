import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import Head from 'next/head';

import Page from 'components/Page';
import AboutContent from 'components/About/Content';
import SideBar from 'components/About/SideBar';
import Layout from 'components/Layout';

import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const useStyles = makeStyles({
  root: {
    padding: '8rem 0'
  }
});

const GET_TEAMS = gql`
  query {
    team(slug: "pesacheck-promise-tracker") {
      name
    }
  }
`;
function About() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TEAMS);
  console.log('BOOM', { loading, error, data });

  if (loading) return 'Loading...';
  if (error) return `Error! Data is undefined`;

  return (
    <>
      <Head>
        <title>About - Promise Tracker</title>
      </Head>
      <Page>
        <Layout classes={{ root: classes.root }}>
          <Grid
            container
            spacing={10}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <AboutContent />

            <SideBar />
          </Grid>
        </Layout>
      </Page>
    </>
  );
}

export default About;
