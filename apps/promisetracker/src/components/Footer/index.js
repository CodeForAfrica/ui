import React from 'react';

import { Grid, Container } from '@material-ui/core';

import About from 'components/Footer/About';
import Community from 'components/Footer/Community';
import Partners from 'components/Footer/Partners';
import SectionBox from 'components/PageSections/SectionBox';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <SectionBox className={classes.root}>
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6} md={7}>
            <About />
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Community />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Partners />
          </Grid>
        </Grid>
      </Container>
    </SectionBox>
  );
}

export default Footer;
