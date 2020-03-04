import React from 'react';

import { Typography } from '@material-ui/core';

import A from 'components/A';
import config from 'config';

function About() {
  return (
    <div>
      <Typography variant="body1" paragraph>
        <b>{config.title}</b>, is a tool to help journalists and civil society
        watchdogs more easily track campaign promises and other political /
        government pledges, using official evidence / data, as well as
        crowdsourced information, with a transparent and defensible methodology,
        to help inject accountability and honesty into the often cavalier way
        that promises are made to citizens to win their support for elections,
        policies and contracts but are seldom honoured.
      </Typography>

      <Typography variant="body1" paragraph>
        This site is an{' '}
        <A href="https://openafrica.net/">
          <b>openAFRICA</b>
        </A>{' '}
        project of{' '}
        <A href="https://codeforafrica.org/">
          <b>Code for Africa</b>
        </A>
        . All content is released under a{' '}
        <A href="https://creativecommons.org/licenses/by/4.0/">
          <b>Creative Commons 4 Attribution Licence</b>
        </A>
        . Reuse it to help empower your own community. The code is available on{' '}
        <A href={config.github.url}>
          <b>GitHub</b>
        </A>{' '}
        and data is available on{' '}
        <A href={config.openafrica.url}>
          <b>openAFRICA</b>
        </A>
        .
      </Typography>
    </div>
  );
}

export default About;
