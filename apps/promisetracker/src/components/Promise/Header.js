import React from 'react';

import { Typography, Grid } from '@material-ui/core';

import { useRouter } from 'next/router';

import { Facebook, Twitter } from 'react-feather';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import propTypes from 'components/propTypes';
import StatusChip from 'components/StatusChip';

function PromiseHeader({ status, title, term, topic }) {
  const router = useRouter();
  const statusAndShareSectionId = 'statusAndShareSection';
  const shareUrl = router.query.id;
  return (
    <Grid container direction="column" justify="space-between" spacing={4}>
      <Grid item>
        <Typography variant="h4">{title}</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          {term} | {topic}
        </Typography>
      </Grid>

      <Grid
        id={statusAndShareSectionId}
        item
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid item xs={4}>
          <StatusChip status={status} style={{ color: 'white' }} />
        </Grid>
        <Grid container item justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="body1">Share:</Typography>
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
  );
}

PromiseHeader.propTypes = {
  status: propTypes.oneOf([
    'complete',
    'behind-schedule',
    'unstarted',
    'in-progress',
    'stalled',
    'inconclusive',
    ''
  ]).isRequired,
  title: propTypes.string.isRequired,
  term: propTypes.string.isRequired,
  topic: propTypes.string.isRequired
};

export default PromiseHeader;
