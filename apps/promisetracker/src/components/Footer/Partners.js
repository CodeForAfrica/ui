import React from 'react';

import { makeStyles, Grid } from '@material-ui/core';

import A from '../A';

import pesacheck from '../assets/images/logos/pesacheck.png';
import hivos from '../assets/images/logos/hivos.png';
import cfa from '../assets/images/logos/codeforafrica.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%', // 156px / 16
    [theme.breakpoints.up('md')]: {
      width: '15.5625rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '12.5625rem'
    }
  },
  img: {
    height: 'auto',
    maxWidth: '100%'
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
    >
      <Grid item xs={12}>
        <A href="https://pesacheck.org/">
          <img src={pesacheck} alt="Pesa check" className={classes.img} />
        </A>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <A href="https://codeforkenya.org">
            <img src={cfa} alt="Code for Africa" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={6}>
          <A href="https://www.hivos.org">
            <img src={hivos} alt="Hivos" className={classes.img} />
          </A>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Partners;
