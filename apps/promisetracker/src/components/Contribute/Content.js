import React from 'react';

import { Typography, Grid } from '@material-ui/core';

import propTypes from '../propTypes';

function Content({ title, subtitle, description }) {
  return (
    <Grid container direction="column" justify="flex-start">
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Grid>
  );
}

Content.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};

export default Content;
