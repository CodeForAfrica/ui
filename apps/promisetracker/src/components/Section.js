import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import propTypes from './propTypes';

const useStyles = makeStyles({
  root: {
    padding: '1rem'
  },
  title: {
    padding: '0.6rem 0'
  }
});

function Section({ title, children }) {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3} className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {title}:
      </Typography>
      {children}
    </Grid>
  );
}

Section.propTypes = {
  title: propTypes.string,
  children: propTypes.children.isRequired
};

Section.defaultProps = {
  title: undefined
};

export default Section;
