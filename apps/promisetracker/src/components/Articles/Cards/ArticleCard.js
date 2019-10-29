import React from 'react';

import {
  Typography,
  Grid,
  makeStyles,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import propTypes from '../../propTypes';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem'
  },
  img: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30'
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
  return (
    <Card component={Grid} item xs={12} sm={4} className={classes.root}>
      <a
        href={`https://pesacheck.org/${uniqueSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.a}
      >
        <CardMedia
          component="img"
          alt="Article Thumbnail"
          src={mediaSrc}
          className={classes.img}
        />
        {/*
        <Grid item xs={12} sm={4}>
            <img
              src={mediaSrc}
              alt="Article Thumbnail"
              className={classes.img}
            />
          </Grid>
         */}
        <CardContent>
          <Typography variant="caption"> {subtitle}</Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body2">{formattedDate}</Typography>
        </CardContent>
      </a>
    </Card>
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
