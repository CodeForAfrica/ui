import React from 'react';

import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import A from 'components/A';

import pesacheck from 'assets/images/logos/pesacheck-white.png';
import cfa from 'assets/images/logos/cfawhite.png';

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: '120px',
    maxHeight: '100px',
    margin: '5px'
  },
  body1: {
    color: theme.palette.secondary.grey
  }
}));

function Partners(props) {
  const classes = useStyles(props);

  return (
    <Box textAlign="center">
      <Typography variant="body1" className={classes.body1}>
        A Project By:
      </Typography>
      <A href="https://pesacheck.org/">
        <img src={pesacheck} alt="PesaCheck" className={classes.img} />
      </A>
      <A href="https://codeforafrica.org/">
        <img src={cfa} alt="Code for Africa" className={classes.img} />
      </A>
    </Box>
  );
}

export default Partners;
