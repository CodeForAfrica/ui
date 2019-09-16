import React from 'react';
import PropTypes from 'prop-types';


import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF,
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  fa: {
    transition: 'all .5s ease-in-out',
    marginRight: '1rem',
    color: 'grey',
    fontSize: '0.9375rem', // icons inherit font size of their parent
    ' &:hover': {
      color: 'black'
    }
  },
  links: { color: '#fff' }
});

library.add(faFacebookF, faTwitter, faInstagram);

function SocialMedia({ classes }) {
  return (
    <Grid item xs={4}>
      <Typography variant="h3">ON SOCIAL MEDIA</Typography>
      <Grid container direction="row" justify="flex-start" alignItems="center" style={{ marginTop: "2rem" }}>
        <Grid item>
          <a
            href="https://www.facebook.com/AfricanCIR/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={classes.fa}
              icon={['fab', 'facebook-f']}
              size="lg"
            />
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://www.instagram.com/explore/tags/onsgrond/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={classes.fa}
              icon={['fab', 'instagram']}
              size="lg"
            />
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://twitter.com/africancir"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={classes.fa}
              icon={['fab', 'twitter']}
              size="lg"
            />
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://twitter.com/africancir"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={classes.fa}
              icon={['fab', 'telegram']}
              size="lg"
            />
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}

SocialMedia.propTypes = {
  classes: PropTypes.shape().isRequired
};
export default withStyles(styles)(SocialMedia);
