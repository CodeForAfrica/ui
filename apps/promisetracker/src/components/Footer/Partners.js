import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import A from '../A';

import bbc from '../assets/images/partners/bbc.png';
import dw from '../assets/images/partners/dw.png';
import foreignAffairs from '../assets/images/partners/foreignaffairs.png';
import politifact from '../assets/images/partners/politifact.png';
import poyner from '../assets/images/partners/poyner.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
    padding: '2rem'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
});

function Partners({ classes }) {
  return (
    <Grid className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={2}>
          <A href="https://www.foreignaffairs.com/articles/2014-01-06/just-facts">
            <img src={foreignAffairs} alt="Foreign Affairs" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <A href="https://www.bbc.com/persian/iran/2015/08/150803_l10_rouhani_2nd_anniv_promises_review">
            <img
              src={bbc}
              alt="BBC"
              className={classes.img}
            />
          </A>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <A href="https://www.poynter.org/reporting-editing/2015/how-the-rouhani-meter-fact-checks-irans-president-from-6000-miles-away/">
            <img src={poyner} alt="Poyner" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <A href="https://www.dw.com/fa-ir/کدام-وعدههای-روحانی-محقق-شدند/a-18652747">
            <img src={dw} alt="DW" className={classes.img} />
          </A>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
            <img src={politifact} alt="Politifact" className={classes.img} />
          </A>
        </Grid>
      </Grid>
    </Grid>
  );
}

Partners.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Partners);
