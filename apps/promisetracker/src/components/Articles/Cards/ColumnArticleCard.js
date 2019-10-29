import React from 'react';

import { Typography, Grid, makeStyles } from '@material-ui/core';
import propTypes from '../../propTypes';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem'
  },
  img: {
    height: 'auto',
    maxWidth: '100%'
  },
  mainGrid: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}));

function ColumnArticleCard({
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
    <div className={classes.root}>
      <a
        href={`https://pesacheck.org/${uniqueSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.a}
      >
        <Grid
          container
          direction="row"
          spacing={2}
          className={classes.mainGrid}
        >
          <Grid item xs={12} sm={4}>
            <img
              src={mediaSrc}
              alt="Article Thumbnail"
              className={classes.img}
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={8}
            direction="column"
            spacing={3}
            className={classes.typoGrid}
          >
            <Grid item>
              <Typography variant="caption">{subtitle}</Typography>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body1">{description}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{formattedDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </a>
    </div>
  );
}

ColumnArticleCard.propTypes = {
  mediaSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string,
  uniqueSlug: propTypes.string.isRequired,
  date: propTypes.oneOfType([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired
};

ColumnArticleCard.defaultProps = {
  description: undefined
};

export default ColumnArticleCard;
