import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { RichTypography } from "@commons-ui/core";

import MinusIcon from "@/promisetracker/icons/Minus";
import PlusIcon from "@/promisetracker/icons/Plus";

import useStyles from "./useStyles";

function AccordionPanel({ expanded: expandedProp, summary, title, ...props }) {
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(expandedProp);
  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Accordion
      {...props}
      elevation={0}
      expanded={expanded}
      onChange={handleChange}
      classes={{ root: classes.accordion, expanded: classes.accordionExpanded }}
    >
      <AccordionSummary
        expandIcon={expanded ? <MinusIcon /> : <PlusIcon />}
        classes={{
          root: classes.accordionSummary,
          content: classes.accordionSummaryContent,
        }}
      >
        <Typography variant="h4">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetails }}>
        <Typography variant="body2">{summary}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
AccordionPanel.propTypes = {
  expanded: PropTypes.bool,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

AccordionPanel.defaultProps = {
  expanded: false,
};

export default AccordionPanel;
