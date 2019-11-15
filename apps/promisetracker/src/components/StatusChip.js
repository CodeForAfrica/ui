import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import propTypes from 'components/propTypes';

import data from 'data';

const useStyles = makeStyles({
  root: {
    width: '50%',
    padding: '0.2rem 1.25rem',
    textDecoration: 'none'
  }
});

function StatusChip({ status, href, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Button
      variant="contained"
      color="primary"
      href={`/promises?status=${status}`}
      className={classes.root}
    >
      {data.statusTypes.find(s => s.slug === status).name}
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
