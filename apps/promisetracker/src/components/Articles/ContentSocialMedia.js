import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Facebook, Instagram, Twitter, Send } from 'react-feather';
import Divider from '@material-ui/core/Divider';

import A from '../A';

const useStyles = makeStyles({
  icon: {
    transition: 'all .5s ease-in-out',
    color: 'grey',
    ' &:hover': {
      color: '#257ca3'
    }
  }
});

function ContentSocialMedia() {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        style={{ padding: '0.5rem 0' }}
      >
        <Grid item>
          <Typography variant="body1">Share :</Typography>
        </Grid>
        <Grid item>
          <A href="https://www.facebook.com/AfricanCIR/">
            <Facebook className={classes.icon} />
          </A>
        </Grid>
        <Grid item>
          <A href="https://www.instagram.com/explore/tags/onsgrond/">
            <Instagram className={classes.icon} />
          </A>
        </Grid>
        <Grid item>
          <A href="https://twitter.com/africancir">
            <Twitter className={classes.icon} />
          </A>
        </Grid>
        <Grid item>
          <A href="https://twitter.com/africancir">
            <Send className={classes.icon} />
          </A>
        </Grid>
      </Grid>
      <Divider component="hr" />
    </div>
  );
}

export default ContentSocialMedia;
