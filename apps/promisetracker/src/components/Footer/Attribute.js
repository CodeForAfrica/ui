import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, makeStyles } from '@material-ui/core';
import cc from '../assets/images/partners/cc.png';

import A from '../A';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    marginTop: '1rem'
  },
  img: {
    filter: 'grayscale(100 %)',
    width: '50%',
    height: 'auto'
  }
})

function Attribute() {
  const classes = useStyles();
  return (
    <Grid item className={classes.root} xs={7} md={4}>
      <Grid item xs={4}>
        <A href="https://www.dw.com/fa-ir/کدام-وعدههای-روحانی-محقق-شدند/a-18652747">
          <img src={cc} alt="Creative Commons" />
        </A>
      </Grid>
      <Typography variant="body2">This work is licensed under a Creative Commons
        Attribution-NonCommercial-ShareAlike 4.0 International License.</Typography>
    </Grid>
  );
}
Attribute.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default Attribute;
