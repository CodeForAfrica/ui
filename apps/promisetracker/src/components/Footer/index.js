import React from 'react';
import PropTypes from 'prop-types';

import { Grid, makeStyles } from '@material-ui/core';

import SocialMedia from './SocialMedia';
import ProjectBy from './ProjectBy';
import OtherProjects from './OtherProjects';
import Attribute from './Attribute';


const useStyles = makeStyles({
  root: {
    backgroundColor: '#e6e6e6',
    padding: '1rem 0'
  },
  grid: { padding: '2rem' },

})

function Footer() {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.root}>
        <SocialMedia />
        <ProjectBy />
        <OtherProjects />
        <Attribute />
      </Grid>
    </Grid>
  );
}

Footer.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default (Footer);
