import React from 'react';

import { Typography, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import A from 'components/A';
import config from 'config';

const useStyles = makeStyles(theme => ({
  list: {
    marginBottom: theme.spacing(1)
  },
  body1: {
    color: theme.palette.secondary.grey
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.common.white,
      textDecoration: 'underline'
    }
  }
}));

function Community(props) {
  const classes = useStyles(props);
  return (
    <div>
      <Typography variant="body1" className={classes.body1}>
        Other PesaCheck Projects:
      </Typography>
      <List className={classes.list}>
        <ListItem dense>
          <A href="https://taxclock.pesacheck.org/" className={classes.link}>
            <b>Tax Clock</b>
          </A>
        </ListItem>
        <ListItem dense>
          <A href="https://pesayetu.pesacheck.org/" className={classes.link}>
            <b>PesaYet</b>u
          </A>
        </ListItem>
      </List>

      <Typography variant="body1" className={classes.body1}>
        Join Our Community:
      </Typography>
      <List className={classes.list}>
        <ListItem dense>
          <A href={config.facebook.url} className={classes.link}>
            <b>{config.facebook.title}</b>
          </A>
        </ListItem>
        <ListItem dense>
          <A href={config.twitter.url} className={classes.link}>
            <b>{config.twitter.title}</b>
          </A>
        </ListItem>
      </List>
    </div>
  );
}

export default Community;
