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
  footer: {
    backgroundColor: '#e6e6e6',
    padding: '1rem 0'
  },
  grid: { padding: '2rem' }
});

function Footer({ classes }) {
  return (
    <div>
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
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Footer);
