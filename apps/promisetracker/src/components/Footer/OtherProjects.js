import React from 'react';

import { Grid } from '@material-ui/core';
import ironBudjet from '../assets/images/partners/iranbudjet.svg';
import mn from '../assets/images/partners/majlisnameh.svg';

import A from '../A';
import Section from './Section';

function OtherProjects() {
  return (
    <Section title="OTHER PROJECTS BY" spacing={2}>
      <Grid item>
        <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
          <img
            className="Mui-desaturated"
            src={ironBudjet}
            alt="asl"
            height={28}
            width={120}
          />
        </A>
      </Grid>
      <Grid item>
        <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
          <img
            className="Mui-desaturated"
            src={mn}
            alt="asl"
            height={28}
            width={120}
          />
        </A>
      </Grid>
    </Section>
  );
}

export default OtherProjects;
