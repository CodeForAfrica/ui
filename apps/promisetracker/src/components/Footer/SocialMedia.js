import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faTelegram
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid } from '@material-ui/core';
import A from '../A';
import Section from './Section';

library.add(faFacebookF, faTwitter, faInstagram, faTelegram);

function SocialMedia() {
  return (
    <Section title="ON SOCIAL MEDIA" spacing={2}>
      <Grid item>
        <A
          href="https://www.facebook.com/AfricanCIR/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="Mui-desaturated"
            icon={['fab', 'facebook-f']}
            size="2x"
          />
        </A>
      </Grid>
      <Grid item>
        <A
          href="https://www.instagram.com/explore/tags/onsgrond/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="Mui-desaturated"
            icon={['fab', 'instagram']}
            size="2x"
          />
        </A>
      </Grid>
      <Grid item>
        <A
          href="https://twitter.com/africancir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="Mui-desaturated"
            icon={['fab', 'twitter']}
            size="2x"
          />
        </A>
      </Grid>
      <Grid item>
        <A
          href="https://twitter.com/africancir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="Mui-desaturated"
            icon={['fab', 'telegram']}
            size="2x"
          />
        </A>
      </Grid>
    </Section>
  );
}

export default SocialMedia;
