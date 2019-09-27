import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import propTypes from '../../propTypes';

import RouterLink from '../../RouterLink';

const useStyles = makeStyles(theme => ({
  root: ({ width, height, square }) => ({
    width: '100%',
    height: '11rem',
    [theme.breakpoints.up('md')]: {
      width: width || '100%',
      height: height || (square ? '33rem' : '11rem')
    }
  }),
  inner: ({ width, height, square }) => ({
    display: 'flex',
    width: '100%',
    height: '11rem',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
      flexDirection: square ? 'column' : 'row',
      width: width || '100%',
      height: height || (square ? '33rem' : '11rem')
    },
    position: 'relative',
    padding: '1rem'
  }),
  image: ({ jumbo, square }) => ({
    objectFit: 'cover',
    display: 'none',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: '10rem',
      height: '11rem'
    },
    [theme.breakpoints.up('md')]: {
      height: square ? '75%' : '100%',
      // eslint-disable-next-line no-nested-ternary
      width: jumbo ? '50%' : square ? '100%' : '20%'
    }
  }),
  content: ({ square }) => ({
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '1.25rem'
    },
    [theme.breakpoints.up('md')]: {
      height: square ? '25%' : '100%',
      paddingLeft: !square ? '1.25rem' : 'unset'
    }
  }),
  label: ({ jumbo }) => ({
    color: theme.palette.action.active,
    fontWeight: jumbo ? 700 : undefined,
    fontSize: jumbo ? '1.125rem' : undefined
  }),
  title: ({ jumbo }) => ({
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      fontSize: jumbo ? '1.75rem' : undefined,
      lineHeight: jumbo ? '2.375rem' : undefined
    },
    marginBottom: '0.5rem'
  }),
  description: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  actionArea: {
    display: 'inline-block',
    '&:hover': {
      color: 'unset',
      '& h2': {
        color: theme.palette.action.active
      }
    }
  }
}));

function ArticleCard({
  jumbo,
  square,
  width,
  height,
  title,
  description,
  mediaSrc,
  date,
  subtitle,
  slug
}) {
  const classes = useStyles({ width, height, jumbo, square });

  return (
    <RouterLink className={classes.actionArea} to={`articles/${slug}`}>
      <div className={classes.root}>
        <div className={classes.inner}>
          <img
            className={classes.image}
            src={mediaSrc}
            alt="Article Thumbnsail"
          />
          <Grid
            className={classes.content}
            container
            direction="column"
            justify="space-between"
          >
            <Grid item>
              <Typography className={classes.label}>{subtitle}</Typography>
              <Typography className={classes.title} variant="h2">
                {title}
              </Typography>
              {description && (
                <Typography className={classes.description}>
                  {description}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">{date}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </RouterLink>
  );
}

ArticleCard.propTypes = {
  jumbo: propTypes.bool,
  square: propTypes.bool,
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  mediaSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string,
  slug: propTypes.string.isRequired,
  date: propTypes.oneOfType([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired
};

ArticleCard.defaultProps = {
  jumbo: false,
  width: undefined,
  height: undefined,
  square: false,
  description: undefined
};

export default ArticleCard;
