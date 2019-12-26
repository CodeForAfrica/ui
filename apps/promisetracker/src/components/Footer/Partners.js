import React from 'react';

import { makeStyles, Typography, Box } from '@material-ui/core';

import A from 'components/A';

import pesacheck from 'assets/images/logos/pesacheck-short-small.png';
import cfa from 'assets/images/logos/cfafrica.png';

const useStyles = makeStyles({
  img: {
    maxWidth: '120px',
    maxHeight: '100px',
    margin: '5px'
  }
});

function Partners(props) {
  const classes = useStyles(props);

  return (
    <Box textAlign="center">
      <Typography variant="subtitle1">A Project By:</Typography>
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
