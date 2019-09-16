import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import propTypes from './propTypes';

const useStyles = makeStyles({
  root: ({ width, height, square }) => ({
    width: width || '100%',
    height: height || (square ? '33rem' : '11rem')
  }),
  inner: ({ width, height, square }) => ({
    display: 'flex',
    flexDirection: square ? 'column' : 'row',
    width: width || '100%',
    height: height || (square ? '33rem' : '11rem'),
    position: 'relative',
    padding: '1rem'
  }),
  image: ({ square }) => ({
    objectFit: 'cover',
    height: square ? '75%' : '100%',
    width: square ? '100%' : '20%'
  }),
  content: ({ square }) => ({
    height: square ? '25%' : '100%',
    paddingLeft: !square ? '1.25rem' : undefined
  })
});

function ArticleCard({ square, width, height, title, description }) {
  const classes = useStyles({ width, height, square });
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <img
          alt=""
          className={classes.image}
          src="https://rouhanimeter.com/rm-media/uploads/RM-report-2019-header-800x546-1-600x410.png"
        />

        <Grid
          className={classes.content}
          container
          direction="column"
          justify="space-between"
        >
          <Grid item>
            <Typography>Report</Typography>
            <Typography>{title}</Typography>
            {description && <Typography>{description}</Typography>}
          </Grid>
          <Grid item>
            <Typography>Aug 23, 2019</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  square: propTypes.bool,
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  height: propTypes.oneOfType([propTypes.number, propTypes.string]),
  title: propTypes.string.isRequired,
  description: propTypes.string
};

ArticleCard.defaultProps = {
  width: undefined,
  height: undefined,
  square: false,
  description: undefined
};

export default ArticleCard;
