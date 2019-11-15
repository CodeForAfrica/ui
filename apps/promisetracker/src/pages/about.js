import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import Head from 'next/head';

import Page from 'components/Page';
import AboutContent from 'components/About/Content';
import SideBar from 'components/About/SideBar';

const useStyles = makeStyles({
  root: {
    padding: '8rem 0'
  }
});

function About() {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>About - Promise Tracker</title>
      </Head>

      <Page>
        <Grid
          container
          spacing={10}
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.root}
        >
          <AboutContent />
          <SideBar />
        </Grid>
      </Page>
    </>
  );
}

export default About;
