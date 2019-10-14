import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import RouterLink from '../RouterLink';
import propTypes from '../propTypes';

const useStyles = makeStyles({
  root: {
    borderTop: '0.0625rem solid #9b9b9b',
    padding: '1.25rem 0'
  },
  label: {
    position: 'relative',
    maxHeight: '2.8rem',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '1.4rem',
      width: '4rem',
      height: '1.4rem',
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255) 50%)',
      textAlign: 'right',
      right: 0
    }
  }
});

function PromiseNavigator({ next, previous }) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="space-between"
      spacing={1}
    >
      {previous && (
        <Grid item xs={6} md={5}>
          <RouterLink to={previous.href} color="#659db9">
            <KeyboardArrowLeft />
            <Typography variant="body2">{previous.label}</Typography>
          </RouterLink>
        </Grid>
      )}
      {next && (
        <Grid container item xs={6} md={5} justify="flex-end">
          <RouterLink to={next.href} color="#659db9">
            <Typography variant="body1">{next.label}</Typography>
            <KeyboardArrowRight />
          </RouterLink>
        </Grid>
      )}
    </Grid>
  );
}

PromiseNavigator.propTypes = {
  next: propTypes.shape({
    label: propTypes.string,
    href: propTypes.string
  }),
  previous: propTypes.shape({
    label: propTypes.string,
    href: propTypes.string
  })
};

PromiseNavigator.defaultProps = {
  next: undefined,
  previous: undefined
};

export default PromiseNavigator;
