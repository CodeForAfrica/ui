import React from 'react'

import { Grid, makeStyles } from '@material-ui/core';
import SideBar from './SideBar';
import AboutContent from './AboutContent';



const useStyles = makeStyles(theme => ({
  root: {
    margin: '3rem',
    height: 'auto',
    maxWidth: '100%'
  }
}));
function About() {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start" className={classes.root}>
      <AboutContent />
      <SideBar />
    </Grid>

  )
}

export default About;