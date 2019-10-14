import React from 'react';
import { Grid, Typography, Link as MuiLink } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import propTypes from '../propTypes';

function Brand({ href }) {
  return (
    <MuiLink component={RouterLink} to={href}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6">PROMISE TRACKER</Typography>
      </Grid>
    </MuiLink>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
