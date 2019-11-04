import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import RouterLink from '../RouterLink';
import propTypes from '../propTypes';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: '1.25rem 0'
  }
}));

function PromiseNavigator({ next, previous }) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="space-between"
      spacing={1}
    >
      {/* We need to keep the item component even when there is not previous
          component to ensure proper positioning of next item
       */}
      <Grid item xs={6} md={5}>
        {previous && (
          <RouterLink to={previous.href} color="#659db9">
            <KeyboardArrowLeft />
            <Typography className={classes.label}>{previous.label}</Typography>
          </RouterLink>
        )}
      </Grid>
      {next && (
        <Grid container item xs={6} md={5} justify="flex-end">
          <RouterLink to={next.href} color="#659db9">
            <Typography className={classes.label}>{next.label}</Typography>
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
