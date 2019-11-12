import React from 'react';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';

import propTypes from '../propTypes';
import StatusChip from '../StatusChip';

function PromiseTimelineEntry({ defaultExpanded, updated, status }) {
  return (
    <ExpansionPanel defaultExpanded={defaultExpanded}>
      <ExpansionPanelSummary>
        <ExpandIcon color="action" className="Mui-icon-expand" />
        <MinimizeIcon
          color="action"
          className="Mui-icon-collapse"
          transform="translate(0,-8)"
        />
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
    'achieved',
    'not-achieved',
    'compromised',
    'in-progress',
    'stalled',
    'inactive'
  ]).isRequired
};

PromiseTimelineEntry.defaultProps = {
  defaultExpanded: false
};

export default PromiseTimelineEntry;
