import React from 'react';
import {
  makeStyles,
  Card,
  Typography,
  CardContent,
  Grid
} from '@material-ui/core';
import propTypes from '../propTypes';
import RouterLink from '../RouterLink';
import StatusChip from '../StatusChip';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    height: '15rem',
    border: '0.0625rem solid rgb(209, 209, 209)',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.1) 0rem 0.125rem 0.125rem 0.0625rem'
    }
  },
  content: {
    height: '100%',
    padding: '1rem'
  },
  title: {
    overflow: 'hidden'
  },
  details: {
    margin: '.5rem 0',
    lineHeight: '2rem'
  }
});

function PromiseCard({
  status,
  title,
  term,
  topic,
  href,
  img,
  label,
  value,
  ...props
}) {
  const classes = useStyles({ status, ...props });
  return (
    <Card className={classes.root} elevation={0}>
      <RouterLink classes={classes.actionArea} to={href}>
        <CardContent
          className={classes.content}
          component={Grid}
          container
          direction="column"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h6" color="primary" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.details} variant="body2">
              {term} | {topic}
            </Typography>
            <StatusChip status={status} />
          </Grid>
        </CardContent>
      </RouterLink>
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
  href: propTypes.string,
  img: propTypes.string,
  label: propTypes.string,
  value: propTypes.number
};

PromiseCard.defaultProps = {
  href: undefined,
  img: undefined,
  label: undefined,
  value: undefined
};

export default PromiseCard;
