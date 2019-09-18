import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import SocialMedia from './SocialMedia';
import ProjectBy from './ProjectBy';
import OtherProjects from './OtherProjects';
import Attribute from './Attribute';
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
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <Layout
      classes={{ root: classes.root, content: classes.content }}
      justify="center"
      spacing={2}
    >
      <Grid item xs={12} md={4}>
        <SocialMedia />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProjectBy />
      </Grid>
      <Grid item xs={12} md={4}>
        <OtherProjects />
      </Grid>
      <Grid item xs={12} md={4}>
        <Attribute />
      </Grid>
    </Layout>
  );
}

export default Footer;
