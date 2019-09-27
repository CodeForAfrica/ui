import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import propTypes from '../../../propTypes';

function ArticleBodyCopy({ first, middle, end }) {
  return (
    <Grid item style={{ padding: '2rem 0' }}>
      <Typography variant="body1">{first}</Typography>
      <br />
      <Typography variant="body1">{middle}</Typography>
      <br />
      <Typography variant="body1">{end}</Typography>
    </Grid>
  );
}

ArticleBodyCopy.propTypes = {
  first: propTypes.string.isRequired,
  middle: propTypes.string.isRequired,
  end: propTypes.string.isRequired
};

export default ArticleBodyCopy;
