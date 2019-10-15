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

function ColumnArticleCard({
  title,
  description,
  mediaSrc,
  subtitle,
  slug,
  date
}) {
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
    <RouterLink to={`articles/${slug}`}>
      <Grid
        container
        direction="row"
        style={{ padding: '2rem 0', borderBottom: '1px solid grey' }}
      >
        <Grid item xs={3}>
          <img
            src={mediaSrc}
            alt="Article Thumbnsail"
            className={classes.img}
          />
        </Grid>

        <Grid container direction="column" justify="start" xs={9}>
          <Typography variant="caption">{subtitle}</Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body2">{formattedDate}</Typography>
        </Grid>
      </Grid>
    </RouterLink>
  );
}

ColumnArticleCard.propTypes = {
  mediaSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string,
  slug: propTypes.string.isRequired,
  date: propTypes.oneOfType([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired
};

ColumnArticleCard.defaultProps = {
  description: undefined
};

export default ColumnArticleCard;
