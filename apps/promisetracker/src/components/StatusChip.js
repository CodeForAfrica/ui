import React from 'react';
import { makeStyles } from '@material-ui/core';
import propTypes from 'components/propTypes';

import ButtonLink from 'components/Link/Button';

import data from 'data';

const useStyles = makeStyles({
  root: {
    padding: '0.2rem 1.25rem',
    textDecoration: 'none'
  }
});

function StatusChip({ status, ...props }) {
  const classes = useStyles({ status, ...props });
  const statusType = data.statusTypes.find(s => s.slug === status);
  const name = (statusType && statusType.name) || '';

  return (
    <ButtonLink
      href={`/promises?status=${status}`}
      variant="contained"
      color="primary"
      className={classes.root}
    >
      {name}
    </ButtonLink>
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
