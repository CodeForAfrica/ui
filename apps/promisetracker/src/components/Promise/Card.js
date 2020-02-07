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
import StatusChip from 'components/Promise/StatusChip';

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: `3px solid ${theme.palette.primary.main}`,
    height: 'auto',
    width: '100%'
  },
  contentGrid: {
    height: '10rem',
    maxHeight: '100%'
  },
  content: {
    marginTop: '1rem'
  }
}));

function PromiseCard({
  status,
  title,
  description,
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
      <CardContent component={Grid} container direction="column">
        <Link href={href} as={as}>
          <Grid item className={classes.contentGrid}>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
            <Typography variant="body2" className={classes.content}>
              {description || ''}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.content}>
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
    'complete',
    'behind-schedule',
    'unstarted',
    'in-progress',
    'stalled',
    'inconclusive',
    ''
  ]).isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string,
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
  description: '',
  label: undefined,
  value: undefined
};

export default PromiseCard;
