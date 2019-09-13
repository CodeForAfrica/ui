import React from 'react';
import { makeStyles } from '@material-ui/core';
import propTypes from './propTypes';

const statusColors = {
  achieved: {
    light: '#377bbf',
    dark: 'rgb(50, 112, 174)'
  },
  compromised: {
    light: '#7b4b94',
    dark: 'rgb(112, 68, 135)'
  },
  'in-progress': {
    light: '#2a9d8f',
    dark: 'rgb(38, 143, 130)'
  },
  'not-achieved': {
    light: '#f25f5c',
    dark: 'rgb(221, 87, 84)'
  },
  stalled: {
    light: '#edae49',
    dark: 'rgb(216, 159, 67)'
  },
  inactive: {
    light: '#9b9b9b',
    dark: 'rgb(141, 141, 141)'
  }
};

const statuses = [
  {
    slug: 'achieved',
    name: 'Achieved'
  },
  {
    slug: 'compromised',
    name: 'Compromised'
  },
  {
    slug: 'in-progress',
    name: 'In Progress'
  },
  {
    slug: 'not-achieved',
    name: 'Not Achieved'
  },
  {
    slug: 'stalled',
    name: 'Stalled'
  },
  {
    slug: 'inactive',
    name: 'Inactive'
  }
];

const useStyles = makeStyles({
  root: ({ status }) => ({
    background: statusColors[status].dark,
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
      {statuses.find(s => s.slug === status).name}
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
