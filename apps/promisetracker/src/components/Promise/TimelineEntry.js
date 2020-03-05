import React, { useState } from 'react';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';

import propTypes from 'components/propTypes';
import StatusChip from 'components/Promise/StatusChip';

function PromiseTimelineEntry({ defaultExpanded, updated, status }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpansionPanel
      defaultExpanded={defaultExpanded}
      onClick={() => setExpanded(!expanded)}
    >
      <ExpansionPanelSummary>
        {(defaultExpanded && expanded) || (!defaultExpanded && !expanded) ? (
          <MinimizeIcon
            color="action"
            className="Mui-icon-collapse"
            transform="translate(0,-8)"
          />
        ) : (
          <ExpandIcon color="action" className="Mui-icon-expand" />
        )}
        <Typography variant="body2">Updated on {updated}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <StatusChip status={status} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
PromiseTimelineEntry.propTypes = {
  defaultExpanded: propTypes.bool,
  updated: propTypes.string.isRequired,
  status: propTypes.oneOf([
    'complete',
    'behind-schedule',
    'unstarted',
    'in-progress',
    'stalled',
    'inconclusive',
    ''
  ]).isRequired
};

PromiseTimelineEntry.defaultProps = {
  defaultExpanded: false
};

export default PromiseTimelineEntry;
