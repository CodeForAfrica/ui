import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import propTypes from '../propTypes';

const useStyles = makeStyles({
  root: {
    padding: '2rem 0'
  },
  typo: { padding: '0.5rem 0' }
});

function Content({ first, middle, end }) {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      <Typography variant="body1" className={classes.typo}>
        {first}
      </Typography>

      <Typography variant="body1" className={classes.typo}>
        {middle}
      </Typography>

      <Typography variant="body1" className={classes.typo}>
        {end}
      </Typography>
    </Grid>
  );
}

Content.propTypes = {
  first: propTypes.string.isRequired,
  middle: propTypes.string.isRequired,
  end: propTypes.string.isRequired
};

export default Content;
