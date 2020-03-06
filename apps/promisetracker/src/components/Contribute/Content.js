import React from 'react';

import { Typography, Grid, makeStyles } from '@material-ui/core';

import propTypes from 'components/propTypes';

const useStyles = makeStyles(theme => ({
  typo: {
    color: theme.palette.common.white
  }
}));

function Content({ title, subtitle, description }) {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="flex-start">
      <Typography variant="h4" className={classes.typo}>
        {title}
      </Typography>
      <Typography variant="h5" className={classes.typo}>
        {subtitle}
      </Typography>
      <Typography variant="body1" className={classes.typo}>
        {description}
      </Typography>
    </Grid>
  );
}

Content.defaultProps = {
  description: ''
};

Content.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string
};

export default Content;
