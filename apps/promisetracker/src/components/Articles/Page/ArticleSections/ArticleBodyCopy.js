import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import propTypes from '../../../propTypes';

function ArticleBodyCopy({ content }) {
  return (
    <Grid item style={{ padding: '0.8rem 0' }}>
      <Typography variant="body1">{content}</Typography>
    </Grid>
  );
}

ArticleBodyCopy.propTypes = {
  content: propTypes.string.isRequired
};

export default ArticleBodyCopy;
