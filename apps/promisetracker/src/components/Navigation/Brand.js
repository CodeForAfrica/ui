import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import Link from 'components/Link';
import propTypes from 'components/propTypes';

const useStyles = makeStyles(theme => ({
  typo: {
    color: theme.palette.common.white
  }
}));
function Brand({ href }) {
  const classes = useStyles();
  return (
    <Link to={href}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6" className={classes.typo}>
          PROMISE TRACKER
        </Typography>
      </Grid>
    </Link>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
