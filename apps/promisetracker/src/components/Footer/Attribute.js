import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import cc from '../assets/images/partners/cc.png';

import A from '../A';
import Section from './Section';

function Attribute() {
  return (
    <Section direction="column">
      <Grid item>
        <A href="https://www.dw.com/fa-ir/کدام-وعدههای-روحانی-محقق-شدند/a-18652747">
          <img src={cc} alt="Creative Commons" />
        </A>
      </Grid>
      <Grid item md={9}>
        <Typography variant="body2">
          This work is licensed under a Creative Commons
          Attribution-NonCommercial-ShareAlike 4.0 International License.
        </Typography>
      </Grid>
    </Section>
  );
}

export default Attribute;
