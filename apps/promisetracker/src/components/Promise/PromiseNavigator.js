import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import RouterLink from '../RouterLink';

const useStyles = makeStyles({
  root: {
    borderTop: '0.0625rem solid #9b9b9b',
    padding: '1.25rem 0'
  }
});

function PromiseNavigator() {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container justify="space-between">
      <Grid item>
        <RouterLink to="">
          <KeyboardArrowLeft />
          <Typography>Providing Affordable Internet</Typography>
        </RouterLink>
      </Grid>
      <Grid item>
        <RouterLink to="">
          <Typography>Providing Affordable Internet</Typography>
          <KeyboardArrowRight />
        </RouterLink>
      </Grid>
    </Grid>
  );
}

export default PromiseNavigator;
