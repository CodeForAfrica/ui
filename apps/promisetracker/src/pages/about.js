import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import Head from 'next/head';

import Page from 'components/Page';
import AboutContent from 'components/About/Content';
import SideBar from 'components/About/SideBar';
import Layout from 'components/Layout';

import withApollo from 'lib/withApollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles({
  root: {
    padding: '8rem 0'
  }
});

const GET_PROMISES = gql`
  query {
    team(slug: "pesacheck-promise-tracker") {
      id
      name
      projects {
        edges {
          node {
            id
            title
            project_medias(last: 6) {
              edges {
                node {
                  id
                  dbid
                  title
                  tasks {
                    edges {
                      node {
                        id
                        label
                        first_response_value
                      }
                    }
                  }
                  tags {
                    edges {
                      node {
                        id
                        tag_text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function About() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_PROMISES);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return null;
  }
  console.log(data);

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

export default withApollo(About);
