import React from 'react';

import { Grid } from '@material-ui/core';
import ArticleContribute from './ArticleSections/ArticleContribute';

function ArticleSideBar() {
  return (
    <Grid item xs={12} md={4}>
      <ArticleContribute />
    </Grid>
  );
}

export default ArticleSideBar;
