import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import { Facebook, Twitter } from 'react-feather';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import propTypes from '../propTypes';
import StatusChip from '../StatusChip';

import useScrollListener from '../../useScrollListener';

import config from '../../config';

import FixedHeader from './FixedHeader';

const fixedHeaderHeight = 60;

const useStyles = makeStyles(theme => ({
  fixed: ({ status, showFixedHeader }) => ({
    position: 'fixed',
    transition: 'all .27s ease 0s',
    top: showFixedHeader ? 0 : -fixedHeaderHeight,
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
  root: ({ status }) => ({
    position: 'relative',
    paddingBottom: '1.25rem',
    marginBottom: '1.25rem',
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
  content: {
    height: '100%',
    padding: '1rem',
    '&:last-child': {
      paddingBottom: '1rem'
    }
  },
  details: {
    margin: '0.5rem 0',
    lineHeight: '2rem'
  },
  fixedHeaderTitle: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}));

function PromiseHeader({
  status,
  title,
  term,
  topic,
  href,
  img,
  label,
  value,
  ...props
}) {
  const statusAndShareSectionId = 'statusAndShareSection';
  const showFixedHeader = useScrollListener(0, '<', statusAndShareSectionId);
  const classes = useStyles({ status, showFixedHeader, ...props });
  const shareUrl = window.location.href;

  return (
    <>
      <FixedHeader show={showFixedHeader} title={title} status={status} />
      <Grid className={classes.root}>
        <Grid item>
          <Typography variant="h1">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.details} variant="body2">
            {term} | {topic}
          </Typography>
          <Grid
            id={statusAndShareSectionId}
            item
            container
            direction="row"
            wrap="nowrap"
          >
            <Grid item>
              <StatusChip status={status} />
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
        </Grid>
      </Grid>
    </>
  );
}

PromiseHeader.propTypes = {
  status: propTypes.oneOf([
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired,
  title: propTypes.string.isRequired,
  term: propTypes.string.isRequired,
  topic: propTypes.string.isRequired,
  href: propTypes.string,
  img: propTypes.string,
  label: propTypes.string,
  value: propTypes.number
};

PromiseHeader.defaultProps = {
  href: undefined,
  img: undefined,
  label: undefined,
  value: undefined
};

export default PromiseHeader;
