import React from 'react';

import { Grid, Typography } from '@material-ui/core';

function ArticleSideBar() {
  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h2" style={{ paddingBottom: '2rem' }}>
        Article SideBar
      </Typography>
    </Grid>
  );
}

export default ArticleSideBar;
