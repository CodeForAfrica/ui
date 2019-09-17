import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import Partners from './Partners';
import SocialMedia from './SocialMedia';
import ProjectBy from './ProjectBy';
import OtherProjects from './OtherProjects';
import Attribute from './Attribute';


const useStyles = makeStyles({
  footer: {
    backgroundColor: '#e6e6e6',
    padding: '1rem 0'
  },
  grid: { padding: '2rem' },
  typoGrid: {
    textAlign: 'center',
    margin: '2rem',
    color: 'black'
  }
})

function Footer() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.typoGrid}>
        <Typography variant="h3">ROUHANIMETER IN MEDIA</Typography>
      </div>
      <Partners />
      <Grid className={classes.footer}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.grid}>
          <SocialMedia />
          <ProjectBy />
          <OtherProjects />
          <Attribute />
        </Grid>
      </Grid>
    </div >
  );
}

Footer.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default (Footer);
