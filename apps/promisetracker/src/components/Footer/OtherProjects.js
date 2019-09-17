import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ironBudjet from '../assets/images/partners/iranbudjet.svg';
import mn from '../assets/images/partners/majlisnameh.svg';

import A from '../A';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  iconGrid: {
    padding: '2rem 0'
  },
  img: {
    maxWidth: '50%',
    height: 'auto',
    filter: 'grayscale(1)',
    ' &:hover': {
      filter: 'none'
    }
  }
});

function OtherProjects({ classes }) {
  return (
    <Grid item className={classes.root} xs={12} sm={6} md={4}>
      <Typography variant="h3" style={{ color: 'black' }}>OTHER PROJECTS BY</Typography>
      <Grid item direction="row" justify="flex-start" className={classes.iconGrid}>
        <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
          <img src={ironBudjet} alt="asl" className={classes.img} />
        </A>
        <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
          <img src={mn} alt="asl" className={classes.img} />
        </A>
      </Grid>
    </Grid >
  );
}
OtherProjects.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(OtherProjects);
