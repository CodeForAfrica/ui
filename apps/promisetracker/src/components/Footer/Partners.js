import React from 'react';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import A from 'components/A';

import pesacheck from 'assets/images/logos/pesacheck-short-small.png';
import cfa from 'assets/images/logos/cfafrica.png';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '15.5625rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '12.5625rem'
    }
  },
  img: {
    maxWidth: '150px'
  }
}));

function Partners(props) {
  const classes = useStyles(props);

  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      justify="flex-start"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="subtitle1">A Project By:</Typography>
      </Grid>
      <Grid item xs={12}>
        <A href="https://pesacheck.org/">
          <img src={pesacheck} alt="PesaCheck" className={classes.img} />
        </A>
      </Grid>
      <Grid item xs={12}>
        <A href="https://codeforafrica.org">
          <img
            src={cfa}
            alt="Code for Africa"
            width="120px"
            className={classes.img}
          />
        </A>
      </Grid>
    </Grid>
  );
}

export default Partners;
