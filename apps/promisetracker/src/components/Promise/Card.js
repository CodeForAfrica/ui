import React from 'react';
import {
  makeStyles,
  Card,
  Typography,
  CardActions,
  CardContent,
  Grid
} from '@material-ui/core';

import Link from 'components/Link';

import propTypes from 'components/propTypes';
import StatusChip from 'components/StatusChip';

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: `3px solid ${theme.palette.primary.main}`,
    height: 'auto',
    width: '100%'
  },
  title: {
    height: '10rem',
    maxHeight: '100%'
  }
}));

function PromiseCard({
  status,
  title,
  term,
  topic,
  href,
  as,
  img,
  label,
  value,
  ...props
}) {
  const classes = useStyles({ status, ...props });
  return (
    <Card elevation={0} className={classes.root}>
      <CardContent component={Grid} container direction="column" spacing={3}>
        <Link href={href} as={as}>
          <Grid item className={classes.title}>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {term} | {topic}
            </Typography>
          </Grid>
        </Link>
      </CardContent>
      <CardActions>
        <StatusChip status={status} />
      </CardActions>
    </Card>
  );
}

PromiseCard.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired,
  title: propTypes.string.isRequired,
  term: propTypes.string.isRequired,
  topic: propTypes.string.isRequired,
  href: propTypes.string.isRequired,
  as: propTypes.string.isRequired,
  img: propTypes.string,
  label: propTypes.string,
  value: propTypes.number
};

PromiseCard.defaultProps = {
  img: undefined,
  label: undefined,
  value: undefined
};

export default PromiseCard;
