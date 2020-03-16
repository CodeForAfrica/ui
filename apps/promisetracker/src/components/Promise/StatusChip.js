import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import propTypes from 'components/propTypes';
import data from 'data';

import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: ({ status }) => ({
    padding: '0.2rem 1.25rem',
    ...theme.typography.button,
    backgroundColor: config.colors[status].dark,
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: `0.2rem`,
    color: 'white',
    textTransform: 'uppercase'
  })
}));

function StatusChip({ status, ...props }) {
  const classes = useStyles({ status, ...props });
  const statusType = data.statusTypes.find(s => s.slug === status);
  const name = (statusType && statusType.name) || '';

  return (
    <Box variant="contained" className={classes.root}>
      {name}
    </Box>
  );
}

StatusChip.propTypes = {
  status: propTypes.oneOf([
    'complete',
    'behind-schedule',
    'unstarted',
    'in-progress',
    'stalled',
    'inconclusive',
    '',
    undefined,
    null
  ]).isRequired
};

export default StatusChip;
