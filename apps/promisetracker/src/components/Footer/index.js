import React from 'react';
import PropTypes from 'prop-types';

import { Grid, makeStyles } from '@material-ui/core';
import SocialMedia from './SocialMedia';
import ProjectBy from './ProjectBy';
import OtherProjects from './OtherProjects';
import Attribute from './Attribute';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e6e6e6',
    padding: '2.5rem'
  },
  grid: {
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}>
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
