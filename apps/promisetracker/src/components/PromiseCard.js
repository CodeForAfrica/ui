import React from 'react';
import {
  makeStyles,
  Card,
  Typography,
  CardContent,
  Grid
} from '@material-ui/core';
// import RouterLink from './RouterLink';
import propTypes from './propTypes';
import RouterLink from './RouterLink';
import StatusChip from './StatusChip';

const statusColors = {
  achieved: {
    light: '#377bbf',
    dark: 'rgb(50, 112, 174)'
  },
  compromised: {
    light: '#7b4b94',
    dark: 'rgb(112, 68, 135)'
  },
  'in-progress': {
    light: '#2a9d8f',
    dark: 'rgb(38, 143, 130)'
  },
  'not-achieved': {
    light: '#f25f5c',
    dark: 'rgb(221, 87, 84)'
  },
  stalled: {
    light: '#edae49',
    dark: 'rgb(216, 159, 67)'
  },
  inactive: {
    light: '#9b9b9b',
    dark: 'rgb(141, 141, 141)'
  }
};

const useStyles = makeStyles({
  root: ({ status }) => ({
    position: 'relative',
    height: '10.625rem',
    width: '100%',
    border: '0.0625rem solid rgb(209, 209, 209)',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.1) 0rem 0.125rem 0.125rem 0.0625rem'
    },
    '&:before': {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '0.25rem',
      content: '""',
      borderTop: `0.25rem solid ${statusColors[status].dark}`
    }
  }),
  content: {
    height: '100%',
    padding: '1rem',
    '&:last-child': {
      paddingBottom: '1rem'
    }
  },
  title: {
    position: 'relative',
    maxHeight: '3.5rem',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '2rem',
      width: '4rem',
      height: '1.4rem',
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255) 50%)',
      textAlign: 'right',
      right: 0
    }
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
            <Typography className={classes.title} variant="h3">
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
