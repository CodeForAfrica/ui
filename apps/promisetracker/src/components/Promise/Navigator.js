import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import propTypes from 'components/propTypes';
import Link from 'components/Link';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: '1.25rem 0'
  },
  link: {
    color: theme.palette.primary.main
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
          <Link href="/promise/[id]" as={previous.href}>
            <Typography className={classes.label}>
              {' '}
              <KeyboardArrowLeft fontSize="small" />
              {previous.label}
            </Typography>
          </Link>
        )}
      </Grid>
      {next && (
        <Grid container item xs={6} md={5} justify="flex-end">
          <Link href={next.href} as={next.href} className={classes.link}>
            <Typography className={classes.label}>
              {next.label} <KeyboardArrowRight fontSize="small" />
            </Typography>
          </Link>
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
