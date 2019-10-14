import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import propTypes from './propTypes';

import config from '../config';

const useStyles = makeStyles({
  root: {
    background: 'grey',
    color: 'white',
    cursor: 'pointer',
    height: '2rem',
    width: 'fit-content',
    padding: '0 1.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function StatusChip({ status, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Button className={classes.root}>
      {config.statusTypes.find(s => s.slug === status).name}
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
  ]).isRequired
};

export default StatusChip;
