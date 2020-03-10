import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    paddingBottom: '2rem'
  }
});
function AboutContent() {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h4" className={classes.title}>
        About PromiseTracker
      </Typography>
      <Typography variant="body1">
        <b>PromiseTracker</b> is a platform-based promise tracker where Kenyan
        citizens can track various promises made by governors in their
        manifestos and during the campaigns leading up to the 2017 general
        election. While the promises made by the national government have been
        covered extensively, promises made by the governors have received less
        coverage, resulting in limited analysis around whether they are actually
        viable.
      </Typography>

      <br />

      <Typography variant="body1">
        Engaging with governments needs data, to this end, this project not only
        develops a promise tracker but also showcases this information on an
        easy-to-understand platform, making <b>PromiseTracker</b> a contributor
        to public discourse around devolution and service delivery by elected
        officials. This leads to a more robust dialogue and positive engagement
        with the county governments around this subject.
      </Typography>

      <br />

      <Typography variant="body1">
        <b>PromiseTracker</b> initial focus will be on Nairobi tracking progress
        on Governor Mike Sonko’s seven-point plan to improve the city in the
        first 100 days of his term. The tracker will also focus on other county
        governors whose plans are elaborated in their manifestos, such as
        Makueni, Nakuru, Kitui and Nandi.
      </Typography>

      <br />

      <Typography variant="body1">
        Promises are logged on Meedan &apos;s Check platform covering the
        following thematic areas - Health, Housing, Jobs, Governance,
        Environment, Traffic Management and Social Inclusion (Youth, Women and
        Persons with Disabilities). Updates on the progress of delivery on these
        promises will then reflect on the main promise tracker website.
      </Typography>
    </Grid>
  );
}

export default AboutContent;
