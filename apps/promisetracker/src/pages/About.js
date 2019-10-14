import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from '../components/Layout';
import Page from '../components/Page';
import AboutContent from '../components/About/AboutContent';
import SideBar from '../components/About/SideBar';

const useStyles = makeStyles({
  root: {
    padding: '8rem 0'
  }
});

function About() {
  const classes = useStyles();
  return (
    <Page>
      <Layout>
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
      </Layout>
    </Page>
  );
}

export default About;
