import React from 'react';

import { Typography, Grid, makeStyles } from '@material-ui/core';
import propTypes from '../../propTypes';

const useStyles = makeStyles(theme => ({
  img: {
    height: 'auto',
    maxWidth: '100%'
  },
  typoGrid: {
    padding: '0 1rem'
  },
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}));

function ArticleCard({
  title,
  description,
  mediaSrc,
  subtitle,
  uniqueSlug,
  date
}) {
  const classes = useStyles();
  const timestamp = new Date(date);
  const formattedDate = timestamp
    .toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
      day: '2-digit'
    })
    .toString();

  // const timestamp = Date.now(); // This would be the timestamp you want to format
  // console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp));
  return (
    <div>
      <a href={`https://pesacheck.org/${uniqueSlug}`} className={classes.a}>
        <Grid item>
          <img src={mediaSrc} alt="Article Thumbnail" className={classes.img} />
        </Grid>
        <Grid container spacing={6} className={classes.typoGrid}>
          <Grid item>
            <Typography variant="caption">{subtitle}</Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{formattedDate}</Typography>
          </Grid>
        </Grid>
      </a>
    </div>
  );
}

ArticleCard.propTypes = {
  mediaSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string,
  uniqueSlug: propTypes.string.isRequired,
  date: propTypes.oneOfType([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired
};

ArticleCard.defaultProps = {
  description: undefined
};

export default ArticleCard;
