import React from 'react';

import { makeStyles } from '@material-ui/core';

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
    <Link href={href} variant="h6" className={classes.typo}>
      PromiseTracker
    </Link>
  );
}

Brand.propTypes = {
  href: propTypes.string.isRequired
};

export default Brand;
