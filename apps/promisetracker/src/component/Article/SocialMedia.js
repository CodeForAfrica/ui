import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { Facebook, Instagram, Twitter, Send } from 'react-feather';

import A from '../A';
import Section from '../Section';

const useStyles = makeStyles({
  root: { padding: '0.5rem 0' }
});

function SocialMedia() {
  const classes = useStyles();
  return (
    <div>
      <Section
        container
        direction="row"
        spacing={2}
        title="Share"
        className={classes.root}
      >
        <Grid item>
          <A
            href="https://www.facebook.com/AfricanCIR/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="Mui-desaturated" />
          </A>
        </Grid>
        <Grid item>
          <A
            href="https://www.instagram.com/explore/tags/onsgrond/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="Mui-desaturated" />
          </A>
        </Grid>
        <Grid item>
          <A
            href="https://twitter.com/africancir"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="Mui-desaturated" />
          </A>
        </Grid>
        <Grid item>
          <A href="#telegram" target="_blank" rel="noopener noreferrer">
            <Send className="Mui-desaturated" />
          </A>
        </Grid>
      </Section>
      <Divider component="hr" />
    </div>
  );
}

export default SocialMedia;
