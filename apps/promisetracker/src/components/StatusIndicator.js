import React from 'react';
import { Grid, Chip, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '9.3125rem',
    [theme.breakpoints.up('md')]: {
      height: '9.3125rem'
    }
  },
  indicatorImage: {
    margin: '0 auto .5rem auto',
    width: '6.4375rem',
    height: '6.4375rem',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  indicatorChip: ({ status }) => ({
    overflow: 'hidden',
    background: statusColors[status].dark,
    justifyContent: 'flex-start',
    color: 'white'
  }),
  indicatorNumber: ({ status }) => ({
    background: statusColors[status].light,
    width: '3rem',
    color: 'white'
  })
}));

function StatusIndicator({ status, label, value, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Grid container className={classes.root} direction="column">
      <img alt="" className={classes.indicatorImage} />
      <Chip
        label={label || status}
        className={classes.indicatorChip}
        avatar={<span className={classes.indicatorNumber}>{value}</span>}
      />
    </Grid>
  );
}

StatusIndicator.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired,
  label: propTypes.string,
  value: propTypes.number
};

StatusIndicator.defaultProps = {
  label: undefined,
  value: undefined
};

export default StatusIndicator;
