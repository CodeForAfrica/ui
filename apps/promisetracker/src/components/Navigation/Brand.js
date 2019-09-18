import React from 'react';
import { Grid, Typography, Link as MuiLink } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import propTypes from '../propTypes';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    height: '100%'
  }
});

function Brand({ href, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiLink className={classes.root} component={RouterLink} to={href}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h2">PROMISE TRACKER</Typography>
      </Grid>
    </MuiLink>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
