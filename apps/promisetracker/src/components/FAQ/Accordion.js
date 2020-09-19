import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";

import iconPlus from "@/promisetracker/assets/plus.svg";
import iconMinus from "@/promisetracker/assets/minus.svg";

function AccordionPanel({ faq }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      onChange={() => {
        setExpanded(!expanded);
      }}
    >
      <AccordionSummary
        expandIcon={
          <img src={expanded ? iconMinus : iconPlus} alt="Panel Button" />
        }
      >
        <Typography variant="h4">{faq.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">{faq.summary}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
AccordionPanel.propTypes = {
  faq: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
};

AccordionPanel.defaultProps = {};

export default AccordionPanel;
