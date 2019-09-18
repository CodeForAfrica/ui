import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import A from '../../components/A';
import Layout from '../../components/Layout';

import bbc from '../../components/assets/images/partners/bbc.png';
import dw from '../../components/assets/images/partners/dw.png';
import foreignAffairs from '../../components/assets/images/partners/foreignaffairs.png';
import politifact from '../../components/assets/images/partners/politifact.png';
import poyner from '../../components/assets/images/partners/poyner.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '2rem'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  },
  typoGrid: {
    textAlign: 'center',
    margin: '1.5rem',
    color: 'black'
  },
  imgGrid: {
    padding: '2rem'
  }
});

function PartnersSection() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.typoGrid}
      >
        <Typography variant="h3">ROUHANIMETER IN MEDIA</Typography>
      </Grid>
      <Grid
        container
        spacing={6}
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.imgGrid}
      >
        <Grid item xs={6} md={2}>
          <A
            href="https://www.foreignaffairs.com/articles/2014-01-06/just-facts"
            style={{ textAlign: 'center' }}
          >
            <img
              src={foreignAffairs}
              alt="Foreign Affairs"
              className={classes.img}
            />
          </A>
        </Grid>
        <Grid item xs={6} md={2}>
          <A href="https://www.bbc.com/persian/iran/2015/08/150803_l10_rouhani_2nd_anniv_promises_review">
            <img src={bbc} alt="BBC" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={6} md={2}>
          <A href="https://www.poynter.org/reporting-editing/2015/how-the-rouhani-meter-fact-checks-irans-president-from-6000-miles-away/">
            <img src={poyner} alt="Poyner" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={6} md={2}>
          <A href="https://www.dw.com/fa-ir/کدام-وعدههای-روحانی-محقق-شدند/a-18652747">
            <img src={dw} alt="DW" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={6} md={2}>
          <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
            <img src={politifact} alt="Politifact" className={classes.img} />
          </A>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default PartnersSection;
