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

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: `2px solid ${theme.palette.secondary}`,
    height: '14rem',
    width: '100%',
    maxHeight: '100%'
  }
}));

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
    <Card elevation={0} className={classes.root}>
      <RouterLink to={href}>
        <CardContent component={Grid} container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
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
