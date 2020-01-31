import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';
import StatusChip from 'components/Promise/StatusChip';

import data from 'data';

const useStyles = makeStyles(theme => ({
  root: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  statusGrid: {
    width: '100%'
  },
  title: {
    paddingBottom: '2rem'
  },
  typo: {
    padding: '1rem 0'
  }
}));

function SideBar({ ...props }) {
  const classes = useStyles(props);
  return (
    <Grid item xs={12} md={4} className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Our Ratings
      </Typography>
      <Grid container spacing={6}>
        {data.statusTypes.map(status => (
          <Grid item className={classes.statusGrid}>
            <StatusChip status={status.slug} />
            <Typography className={classes.typo}>
              {status.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default SideBar;
