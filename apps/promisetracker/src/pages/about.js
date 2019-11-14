import React, { Fragment } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Page from '../component/Page';
import Head from 'next/head';

import AboutContent from '../component/About/Content';
import SideBar from '../component/About/SideBar';

const useStyles = makeStyles({
  root: {
    padding: '8rem 0'
  }
});

function About() {
  const classes = useStyles();
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default About;
