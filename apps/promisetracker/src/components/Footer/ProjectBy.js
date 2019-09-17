import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import asl from '../assets/images/partners/asl.svg';

import A from '../A';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  img: {
    filter: 'grayscale(1)',
    maxWidth: '100%',
    height: 'auto',
    ' &:hover': {
      filter: 'none'
    }
  },
  iconGrid: {
    padding: '1.5rem 0'
  },
});

function ProjectBy({ classes }) {
  return (
    <Grid item className={classes.root} xs={4}>
      <Typography variant="h3">A PROJECT BY</Typography>
      <Grid item xs={4} className={classes.iconGrid}>
        <A href="https://www.politifact.com/truth-o-meter/article/2015/may/12/rouhani-meter-tracks-iran-presidents-campaign-prom/">
          <img src={asl} alt="asl" className={classes.img} />
        </A>
      </Grid>
    </Grid>
  );
}
ProjectBy.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(ProjectBy);
