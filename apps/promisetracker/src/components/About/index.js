import React from 'react'

import { Grid, makeStyles } from '@material-ui/core';
import SideBar from './SideBar';
import AboutContent from './AboutContent';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '4rem',
    paddingBottom: '4rem'
  }
}));

function About() {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={10}
      direction="row"
      justify="center"
      alignItems="flex-start"
      className={classes.root}>
      <AboutContent />
      <SideBar />
    </Grid>

  )
}

export default About;