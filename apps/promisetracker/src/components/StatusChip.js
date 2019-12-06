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
  return (
    <ButtonLink
      href={`/promises?status=${status}`}
      variant="contained"
      color="primary"
      className={classes.root}
    >
      {data.statusTypes.find(s => s.slug === status).name}
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
    'inconclusive'
  ]).isRequired
};

export default StatusChip;
