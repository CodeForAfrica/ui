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
    background: config.colors[status].light
  }),
  largeButton: ({ status }) => ({
    width: '70%',
    background: config.colors[status].dark
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
        <ButtonGroup variant="contained" aria-label="split button" fullWidth>
          <Button size="small" className={classes.smallButton}>
            {value}
          </Button>
          <Button size="small" className={classes.largeButton}>
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
