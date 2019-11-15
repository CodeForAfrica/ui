import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import About from 'components/Footer/About';
import Community from 'components/Footer/Community';
import Partners from 'components/Footer/Partners';
import Layout from 'components/Layout';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e6e6e6',
    padding: '2.5rem 0'
  },
  partners: {
    padding: '2rem 0'
  }
});

function Footer() {
  const classes = useStyles();
  return (
    <Layout classes={{ root: classes.root }} justify="center" spacing={5}>
      <Grid item xs={12} sm={7}>
        <About />
      </Grid>
      <Grid item xs={12} sm={5} container>
        <Grid item>
          <Community />
        </Grid>
        <Grid item className={classes.partners}>
          <Partners />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Footer;
