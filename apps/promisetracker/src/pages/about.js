import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from '../component/Layout';
import Page from '../component/Page';

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
  );
}

export default About;
