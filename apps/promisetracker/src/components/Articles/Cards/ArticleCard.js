import React from 'react';

import { Typography, Grid, makeStyles } from '@material-ui/core';
import propTypes from '../../propTypes';

import RouterLink from '../../RouterLink';

const useStyles = makeStyles({
  img: {
    height: 'auto',
    maxWidth: '100%'
  }
});

function ArticleCard({ title, description, mediaSrc, subtitle, slug, date }) {
  const classes = useStyles();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = dateObj
    .toLocaleString('en-GB', {
      month: 'short',
      year: 'numeric',
      day: '2-digit'
    })
    .toString();
  return (
    <div>
      <RouterLink to={`articles/${slug}`}>
        <Grid item>
          <img src={mediaSrc} alt="Article Thumbnail" className={classes.img} />
        </Grid>
        <Grid container spacing={6} style={{ padding: '0 1rem' }}>
          <Grid item>
            <Typography variant="caption">{subtitle}</Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{formattedDate}</Typography>
          </Grid>
        </Grid>
      </RouterLink>
    </div>
  );
}

ArticleCard.propTypes = {
  mediaSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string,
  slug: propTypes.string.isRequired,
  date: propTypes.oneOfType([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired
};

ArticleCard.defaultProps = {
  description: undefined
};

export default ArticleCard;
