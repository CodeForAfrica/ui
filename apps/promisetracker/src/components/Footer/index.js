import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import About from './About';
import Community from './Community';
import Partners from './Partners';
import Layout from '../Layout';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e6e6e6',
    padding: '2.5rem'
  },
  content: {
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  },
  partners: {
    padding: '2rem 0'
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <Layout
      classes={{ root: classes.root, content: classes.content }}
      justify="center"
      spacing={10}
    >
      <Grid item xs={12} sm={7} className={classes.about}>
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
