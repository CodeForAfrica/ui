import React from 'react';
import { makeStyles } from '@material-ui/core';
import propTypes from './propTypes';

import config from '../config';

const useStyles = makeStyles({
  root: ({ status }) => ({
    background: config.colors[status].light,
    color: 'white',
    cursor: 'pointer',
    borderRadius: '1.125rem',
    height: '2rem',
    width: 'fit-content',
    padding: '0 1.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
});

function StatusChip({ status, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <div className={classes.root}>
      {config.statusTypes.find(s => s.slug === status).name}
    </div>
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
