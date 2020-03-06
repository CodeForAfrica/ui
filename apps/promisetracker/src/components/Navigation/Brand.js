import React from 'react';

import { makeStyles } from '@material-ui/core';

import Link from 'components/Link';
import propTypes from 'components/propTypes';

const useStyles = makeStyles(theme => ({
  typo: {
    color: theme.palette.common.white,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.common.white
    }
  },
  span: {
    color: theme.palette.highlight.main
  },
  greySpan: {
    color: theme.palette.secondary.grey,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.common.white
    }
  }
}));
function Brand({ href }) {
  const classes = useStyles();
  return (
    <Link href={href} variant="h5" className={classes.typo}>
      <span className={classes.span}>PROMISE</span>
      <span className={classes.greySpan}>TRACKER</span>
    </Link>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
