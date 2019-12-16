import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import propTypes from 'components/propTypes';
import data from 'data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0.5rem 1.25rem',
    textDecoration: 'none',
    border: '1px solid theme.palette.primary.main',
    borderRadius: `0.5rem`,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    textTransform: 'uppercase'
  }
}));

function StatusChip({ status, ...props }) {
  const classes = useStyles({ status, ...props });
  const statusType = data.statusTypes.find(s => s.slug === status);
  const name = (statusType && statusType.name) || '';

  return (
    <Box variant="contained" color="primary" className={classes.root}>
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
