import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import propTypes from '../propTypes';

import brandImg from '../assets/images/brand.svg';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    height: '100%'
  },
  brandImage: {
    width: '11.0625rem'
  }
});

function Brand({ href, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiLink className={classes.root} component={RouterLink} to={href}>
      <img alt="brand" src={brandImg} className={classes.brandImage} />
    </MuiLink>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
