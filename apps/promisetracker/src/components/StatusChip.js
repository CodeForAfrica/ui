import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import propTypes from './propTypes';

import data from '../data/data';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    padding: '0.2rem 1.25rem'
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  }
}));

function StatusChip({ status, href, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Button variant="contained" color="primary" className={classes.root}>
      <a href={`/promises?status=${status}`} className={classes.link}>
        {data.statusTypes.find(s => s.slug === status).name}
      </a>
    </Button>
  );
}

StatusChip.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired,
  href: propTypes.string
};

StatusChip.defaultProps = {
  href: undefined
};

export default StatusChip;
