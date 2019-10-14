import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import A from '../A';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    opacity: '0.6'
  },
  body: {
    color: theme.palette.primary.light,
    opacity: '0.6',
    paddingTop: theme.spacing(3)
  },
  links: {
    color: theme.palette.primary.light
  }
}));

function About(props) {
  const classes = useStyles(props);

  return (
    <div>
      <Typography variant="body1" className={classes.title}>
        Promise Tracker, is a tool to help journalists and civil society
        watchdogs more easily track campaign promises and other political /
        government pledges, using official evidence / data, as well as
        crowdsourced information, with a transparent and defensible methodology,
        to help inject accountability and honesty into the often cavalier way
        that
      </Typography>

      <Typography variant="subtitle1" className={classes.body}>
        This site is an{' '}
        <A href="https://openafrica.net/" className={classes.links}>
          openAFRICA
        </A>{' '}
        project of{' '}
        <A href="https://codeforafrica.org/" className={classes.links}>
          Code for Africa
        </A>
        . All content is released under a{' '}
        <A
          href="https://creativecommons.org/licenses/by/4.0/"
          className={classes.links}
        >
          Creative Commons 4 Attribution Licence
        </A>
        . Reuse it to help empower your own community. The code is available on{' '}
        <A href="https://github.com/CodeForAfrica" className={classes.links}>
          Github
        </A>{' '}
        and data is available on{' '}
        <A href="https://openafrica.net/" className={classes.links}>
          openAFRICA
        </A>
        .
      </Typography>
    </div>
  );
}

export default About;
