import React from 'react';

import { makeStyles, Typography, List, ListItem } from '@material-ui/core';

import A from 'components/A';
import theme from 'theme';
import config from 'config';

const useStyles = makeStyles({
  list: {
    marginBottom: theme.spacing(1)
  }
});

function Community(props) {
  const classes = useStyles(props);

  return (
    <div>
      <Typography variant="subtitle1">Other PesaCheck Projects:</Typography>
      <List className={classes.list}>
        <ListItem dense>
          <A href="https://taxclock.pesacheck.org/">Tax Clock</A>
        </ListItem>
        <ListItem dense>
          <A href="https://pesayetu.pesacheck.org/">PesaYetu</A>
        </ListItem>
      </List>

      <Typography variant="subtitle1">Join Our Community:</Typography>
      <List className={classes.list}>
        <ListItem dense>
          <A href={config.facebook.url}>{config.facebook.title}</A>
        </ListItem>
        <ListItem dense>
          <A href={config.twitter.url}>{config.twitter.title}</A>
        </ListItem>
      </List>
    </div>
  );
}

export default Community;
