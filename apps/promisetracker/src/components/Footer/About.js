import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import A from 'components/A';
import config from 'config';

const useStyles = makeStyles(theme => ({
  body1: {
    color: theme.palette.secondary.grey
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.common.white,
      textDecoration: 'underline'
    }
  }
}));

function About() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="body1" paragraph className={classes.body1}>
        <b className={classes.link}>{config.title}</b>, is a tool to help
        journalists and civil society watchdogs more easily track campaign
        promises and other political / government pledges, using official
        evidence / data, as well as crowdsourced information, with a transparent
        and defensible methodology, to help inject accountability and honesty
        into the often cavalier way that promises are made to citizens to win
        their support for elections, policies and contracts but are seldom
        honoured.
      </Typography>

      <Typography variant="body1" paragraph className={classes.body1}>
        This site is an{' '}
        <A href="https://openafrica.net/" className={classes.link}>
          <b>openAFRICA</b>
        </A>{' '}
        project of{' '}
        <A href="https://codeforafrica.org/" className={classes.link}>
          <b>Code for Africa</b>
        </A>
        . All content is released under a{' '}
        <A
          href="https://creativecommons.org/licenses/by/4.0/"
          className={classes.link}
        >
          <b>Creative Commons 4 Attribution Licence</b>
        </A>
        . Reuse it to help empower your own community. The code is available on{' '}
        <A href={config.github.url} className={classes.link}>
          <b>GitHub</b>
        </A>{' '}
        and data is available on{' '}
        <A href={config.openafrica.url} className={classes.link}>
          <b>openAFRICA</b>
        </A>
        .
      </Typography>
    </div>
  );
}

export default About;
