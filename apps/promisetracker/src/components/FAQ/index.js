import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { Section } from "@commons-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {},
  sectionTitle: {
    marginBottom: typography.pxToRem(24),
    marginTop: typography.pxToRem(64),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(35),
    },
  },
}));

function FAQ({ faqs, title, ...props }) {
  const [expanded] = useState(false);
  const classes = useStyles(props);

  return (
    <Section
      title={title}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      {faqs.map((faq) => (
        <Accordion>
          <AccordionSummary
            expandIcon={expanded ? <span>plus</span> : <span>minus</span>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">{faq.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{faq.summary}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Section>
  );
}
FAQ.propTypes = {
  title: PropTypes.string,
  faqs: PropTypes.arrayOf(PropTypes.shape({})),
};

FAQ.defaultProps = {
  title: "FAQ",
  faqs: [
    {
      title: "Lorem ipsum dolor",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
    {
      title: "Lorem ipsum dolor",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
    {
      title: "Lorem ipsum dolor",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
    {
      title: "Lorem ipsum dolor",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
  ],
};

export default FAQ;
