import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import propTypes from './propTypes';

import config from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    height: '2rem',
    width: '50%',
    padding: '0 1.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
        {config.statusTypes.find(s => s.slug === status).name}
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
