import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import propTypes from 'components/propTypes';
import data from 'data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0.2rem 1.25rem',
    ...theme.typography.button,
    backgroundColor: theme.palette.primary.main,
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: `0.2rem`,
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
