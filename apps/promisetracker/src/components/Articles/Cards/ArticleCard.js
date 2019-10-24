import React from 'react';

import { Typography, Grid, makeStyles } from '@material-ui/core';
import propTypes from '../../propTypes';

const useStyles = makeStyles(theme => ({
  img: {
    height: 'auto',
    maxWidth: '100%'
  },
  typoGrid: {
    // padding: '1rem 0rem',
    height: '25rem',
    maxHeight: '100%'
  },
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  titleGrid: {
    height: '10rem',
    maxHeight: '100%'
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
  return (
    <div className={classes.typoGrid}>
      <a
        href={`https://pesacheck.org/${uniqueSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.a}
      >
        <Grid item>
          <img src={mediaSrc} alt="Article Thumbnail" className={classes.img} />
        </Grid>

        <Grid container spacing={5}>
          <Grid item className={classes.titleGrid}>
            <Typography variant="caption"> {subtitle}</Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Grid>

          <Grid item justify="flex-end">
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
