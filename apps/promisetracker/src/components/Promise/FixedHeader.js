import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import { Facebook, Twitter } from 'react-feather';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import propTypes from '../propTypes';
import StatusChip from '../StatusChip';

import config from '../../config';
import Layout from '../Layout';

const fixedHeaderHeight = 60;

const useStyles = makeStyles(theme => ({
  root: ({ status, show }) => ({
    position: 'fixed',
    transition: 'all .27s ease 0s',
    top: show ? 0 : -fixedHeaderHeight,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'white',
    height: fixedHeaderHeight,
    width: '100%',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '0.125rem',
      content: '""',
      backgroundColor: config.colors[status].light
    }
  }),
  fixedHeaderTitle: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}));

function PromiseFixedHeader({ show, status, title, ...props }) {
  const classes = useStyles({ status, show, ...props });
  const shareUrl = window.location.href;

  return (
    <Layout classes={{ root: classes.root }} alignItems="center">
      <Grid item container direction="row" wrap="nowrap">
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <StatusChip status={status} />
          </Grid>
          <Grid item>
            <Typography className={classes.fixedHeaderTitle}>
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item justify="flex-end" spacing={2}>
          <Grid item>
            <Typography>Share:</Typography>
          </Grid>
          <Grid item>
            <FacebookShareButton className="Mui-share" url={shareUrl}>
              <Facebook className="Mui-desaturated" />
            </FacebookShareButton>
          </Grid>
          <Grid item>
            <TwitterShareButton className="Mui-share" url={shareUrl}>
              <Twitter className="Mui-desaturated" />
            </TwitterShareButton>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

PromiseFixedHeader.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired,
  title: propTypes.string.isRequired,
  show: propTypes.bool
};

PromiseFixedHeader.defaultProps = {
  show: false
};

export default PromiseFixedHeader;
