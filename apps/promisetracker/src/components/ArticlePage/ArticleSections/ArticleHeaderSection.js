import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import articleHeaderImage from '../../assets/images/Articles/article.png';

const useStyles = makeStyles({
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
});

function Article() {
  const classes = useStyles();
  return (
    <Grid item>
      <img alt="headerImage" className={classes.img} src={articleHeaderImage} />
      <Typography variant="h5" paragraph="true">
        Report
      </Typography>
      <Typography variant="h4" paragraph="true">
        Rouhani Meter Report(Executive Summary)
      </Typography>
      <Typography variant="caption" paragraph="true">
        August 3rd 2019
      </Typography>
    </Grid>
  );
}

export default Article;
