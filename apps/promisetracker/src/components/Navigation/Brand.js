import React from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  Link as MuiLink
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import propTypes from '../propTypes';

const useStyles = makeStyles(theme => ({
  typo: {
    color: theme.palette.common.white
  }
}));
function Brand({ href }) {
  const classes = useStyles();
  return (
    <MuiLink component={RouterLink} to={href}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6" className={classes.typo}>
          PROMISE TRACKER
        </Typography>
      </Grid>
    </MuiLink>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
