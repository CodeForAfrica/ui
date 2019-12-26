import React from 'react';

import { Grid, Container } from '@material-ui/core';

import About from 'components/Footer/About';
import Community from 'components/Footer/Community';
import Partners from 'components/Footer/Partners';
import SectionBox from 'components/PageSections/SectionBox';

function Footer() {
  return (
    <SectionBox bgcolor="#e6e6e6">
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <About />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Community />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Partners />
          </Grid>
        </Grid>
      </Container>
    </SectionBox>
  );
}

export default Footer;
