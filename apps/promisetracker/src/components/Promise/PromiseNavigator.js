import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import RouterLink from '../RouterLink';

const useStyles = makeStyles({
  root: {
    borderTop: '0.0625rem solid #9b9b9b',
    padding: '1.25rem 0'
  },
  label: {
    position: 'relative',
    maxHeight: '2.8rem',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '1.4rem',
      width: '4rem',
      height: '1.4rem',
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255) 50%)',
      textAlign: 'right',
      right: 0
    }
  }
});

function PromiseNavigator() {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="space-between"
      spacing={1}
    >
      <Grid item xs={6} md={5}>
        <RouterLink to="">
          <KeyboardArrowLeft />
          <Typography className={classes.label}>
            Civil Rights Charter will be submitted to the parliament as a bill
          </Typography>
        </RouterLink>
      </Grid>
      <Grid container item xs={6} md={5} justify="flex-end">
        <RouterLink to="">
          <Typography className={classes.label}>
            Reinstating university professors and administrators dismissed or
            forced into retirement for their political views.
          </Typography>
          <KeyboardArrowRight />
        </RouterLink>
      </Grid>
    </Grid>
  );
}

export default PromiseNavigator;
