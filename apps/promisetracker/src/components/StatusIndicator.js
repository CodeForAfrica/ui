import React from 'react';
import { Grid, makeStyles, Box } from '@material-ui/core';
import propTypes from './propTypes';

import config from '../config';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  indicatorImage: {
    height: 'auto',
    maxWidth: '100%'
  },
  smallButton: ({ status }) => ({
    width: '30%',
    background: config.colors[status].light,
    textTransform: 'uppercase'
  }),
  largeButton: ({ status }) => ({
    width: '70%',
    background: config.colors[status].dark,
    textTransform: 'uppercase'
  })
});

function StatusIndicator({
  status,
  href,
  img,
  label,
  value,
  onMouseEnter,
  onMouseLeave,
  ...props
}) {
  const classes = useStyles({ status, ...props });

  return (
    <div
      onMouseEnter={() => onMouseEnter({ status })}
      onMouseLeave={() => onMouseLeave({ status })}
    >
      <Grid item>
        <img alt="Indicator" className={classes.indicatorImage} src={img} />
        <Box display="flex" flexDirection="row">
          <Box
            color="black"
            pl={2}
            py={1}
            fontWeight={500}
            className={classes.smallButton}
          >
            {value}
          </Box>
          <Box
            color="black"
            pl={2}
            py={1}
            fontWeight={500}
            className={classes.largeButton}
          >
            {label || status}
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

StatusIndicator.propTypes = {
  status: propTypes.oneOf([
    'complete',
    'behind-schedule',
    'unstarted',
    'in-progress',
    'stalled',
    'inconclusive',
    ''
  ]).isRequired,
  href: propTypes.string,
  img: propTypes.string,
  label: propTypes.string,
  value: propTypes.number
};

StatusIndicator.defaultProps = {
  href: undefined,
  img: undefined,
  label: undefined,
  value: undefined
};

export default StatusIndicator;
