import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import propTypes from './propTypes';

import config from '../config';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      margin: '0 0.25rem'
    }
  },
  indicatorImage: {
    height: 'auto',
    maxWidth: '100%'
  },
  smallButton: ({ status }) => ({
    background: config.colors[status].light,
    paddingRight: '0.5rem',
    textAlign: 'right',
    textTransform: 'uppercase',
    width: '25%'
  }),
  largeButton: ({ status }) => ({
    background: config.colors[status].dark,
    paddingLeft: '0.5rem',
    textAlign: 'left',
    textTransform: 'uppercase',
    width: '75%'
  })
}));

const getIndicatorImage = require.context(
  '../assets/images/indicators',
  false,
  /\.png$/
);

function StatusIndicator({ onMouseEnter, onMouseLeave, promise, ...props }) {
  const status = promise.slug;
  const classes = useStyles({ status, ...props });

  return (
    <div
      onMouseEnter={() => onMouseEnter({ status })}
      onMouseLeave={() => onMouseLeave({ status })}
      className={classes.root}
    >
      <img
        alt="Indicator"
        className={classes.indicatorImage}
        src={getIndicatorImage(promise.img)}
      />
      <Box display="flex" flexDirection="row">
        <Box
          color="black"
          pl={2}
          py={1}
          fontSize={12}
          fontWeight={500}
          className={classes.smallButton}
        >
          {promise.count}
        </Box>
        <Box
          color="black"
          pl={2}
          py={1}
          fontSize={12}
          fontWeight={500}
          className={classes.largeButton}
        >
          {promise.name || status}
        </Box>
      </Box>
    </div>
  );
}

StatusIndicator.propTypes = {
  promise: propTypes.shape({
    name: propTypes.string,
    img: propTypes.string,
    slug: propTypes.oneOf([
      'complete',
      'behind-schedule',
      'unstarted',
      'in-progress',
      'stalled',
      'inconclusive',
      ''
    ]),
    count: propTypes.number
  }).isRequired
};

StatusIndicator.defaultProps = {};

export default StatusIndicator;
