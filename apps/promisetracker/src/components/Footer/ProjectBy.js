import React from 'react';

import { Grid } from '@material-ui/core';
import asl from '../assets/images/partners/asl.svg';

import A from '../A';
import Section from './Section';

function ProjectBy() {
  return (
    <Section title="PROJECT BY">
      <Grid item>
        <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
          <img
            className="Mui-desaturated"
            src={asl}
            alt="asl"
            height={50}
            width={120}
          />
        </A>
      </Grid>
    </Section>
  );
}

export default ProjectBy;
