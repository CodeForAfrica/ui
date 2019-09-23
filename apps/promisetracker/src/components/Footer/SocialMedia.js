import React from 'react';

import { Grid } from '@material-ui/core';
import { Facebook, Instagram, Twitter, Send } from 'react-feather';

import { Grid, Typography, makeStyles } from '@material-ui/core';

function SocialMedia() {
  return (
    <Section title="ON SOCIAL MEDIA" spacing={2}>
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
  );
}

export default SocialMedia;
