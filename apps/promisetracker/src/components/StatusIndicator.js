import React from 'react';
import { Grid, makeStyles, Button, ButtonGroup } from '@material-ui/core';
import RouterLink from './RouterLink';
import propTypes from './propTypes';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  indicatorImage: {
    height: 'auto',
    maxWidth: '100%'
  },
  smallButton: {
    width: '30%'
  },
  largeButton: {
    width: '70%'
  }
});

function StatusIndicator({ status, href, img, label, value, ...props }) {
  const classes = useStyles({ status, ...props });
  return (
    <Grid
      container
      to={href || `/promises?status=${status}`}
      component={RouterLink}
      className={classes.root}
      direction="column"
    >
      <Grid item>
        <img alt="Indicator" className={classes.indicatorImage} src={img} />
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="split button"
          fullWidth
        >
          <Button size="small" className={classes.smallButton}>
            {value}
          </Button>
          <Button
            color="primary"
            size="small"
            aria-haspopup="true"
            className={classes.largeButton}
          >
            {label || status}
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

StatusIndicator.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
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
