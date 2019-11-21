import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import propTypes from 'components/propTypes';

import Link from 'components/Link';

import data from 'data';

const useStyles = makeStyles({
  root: {
    padding: '0.2rem 1.25rem',
    textDecoration: 'none'
  }
});

function StatusChip({ status, href, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Link href={`/promises?status=${status}`}>
      <Button variant="contained" color="primary" className={classes.root}>
        {data.statusTypes.find(s => s.slug === status).name}
      </Button>
    </Link>
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
