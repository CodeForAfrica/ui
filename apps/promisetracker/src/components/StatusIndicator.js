import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import RouterLink from './RouterLink';
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
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: '9.3125rem'
    }
  },
  indicatorImage: {
    margin: '0 auto 0.5rem auto',
    width: '6.4375rem',
    height: '6.4375rem',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  indicatorLabel: {
    width: '80%'
  },
  indicatorChip: ({ status }) => ({
    overflow: 'hidden',
    background: statusColors[status].dark,
    justifyContent: 'flex-start',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '1.125rem',
    height: '2.25rem'
  }),
  indicatorNumber: ({ status }) => ({
    background: statusColors[status].light,
    width: '3rem',
    color: 'white',
    textAlign: 'center',
    lineHeight: '2rem'
  })
}));

function StatusIndicator({ status, href, img, label, value, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Grid
      container
      to={href || `/promises?status=${status}`}
      component={RouterLink}
      className={classes.root}
      direction="column"
    >
      <Grid item>
        <img alt="" className={classes.indicatorImage} src={img} />
      </Grid>
      <Grid
        container
        item
        component="span"
        direction="row"
        wrap="nowrap"
        className={classes.indicatorChip}
      >
        <Grid
          container
          item
          component="span"
          justify="center"
          alignItems="center"
          className={classes.indicatorNumber}
        >
          {value}
        </Grid>
        <Grid
          container
          item
          component="span"
          justify="center"
          alignItems="center"
          className={classes.indicatorLabel}
        >
          {label || status}
        </Grid>
      </Grid>
    </Grid>
  );
}

StatusIndicator.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired,
  href: propTypes.string,
  img: propTypes.string,
  label: propTypes.string,
  value: propTypes.number
};

StatusIndicator.defaultProps = {
  href: undefined,
  img: undefined,
  label: undefined,
  value: undefined
};

export default StatusIndicator;
