import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import propTypes from '../propTypes';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '130px',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'unset',
      justifyContent: 'flex-start',
      maxHeight: 'unset'
    }
  },
  content: {
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    }
  }
}));

function Section({ title, children, spacing, direction }) {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid
        className={classes.content}
        container
        item
        xs={12}
        spacing={spacing}
        direction={direction}
      >
        {children}
      </Grid>
    </Grid>
  );
}

Section.propTypes = {
  title: propTypes.string,
  children: propTypes.children.isRequired,
  spacing: propTypes.number,
  direction: propTypes.string
};

Section.defaultProps = {
  title: undefined,
  spacing: undefined,
  direction: undefined
};

export default Section;
