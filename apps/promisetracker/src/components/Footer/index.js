import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Partners from './Partners';
import SocialMedia from './SocialMedia';
import ProjectBy from './ProjectBy';
import OtherProjects from './OtherProjects';
import Attribute from './Attribute';



const styles = () => ({
  mainGrid: {
    backgroundColor: '#e6e6e6',
    paddingTop: '2rem',
    paddingBottom: '2rem'
  }
});

function Footer({ classes }) {
  return (
    <Grid >
      <Partners />
      <div container className={classes.mainGrid}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ margin: '2rem', }}>
          <SocialMedia />
          <ProjectBy />
          <OtherProjects />
          <Attribute />
        </Grid>
      </div>
    </Grid>
  );
}

Footer.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Footer);
