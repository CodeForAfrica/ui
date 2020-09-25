import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { Section } from "@commons-ui/core";

import Accordion from "@/promisetracker/components/FAQ/Accordion";

import useStyles from "./useStyles";

function FAQ({ faqs, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Section
      title={title}
      titleProps={{ variant: "h1" }}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={8}>
          <div className={classes.faqContainer}>
            {faqs.map((faq) => (
              <Accordion key={faq.question} faq={faq} />
            ))}
          </div>
        </Grid>
      </Grid>
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
      question: "Lorem ipsum dolor",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
    {
      question: "Lorem ipsum dolor",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
    {
      question: "Lorem ipsum dolor",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
    {
      question: "Lorem ipsum dolor",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Quisque suscipit, urna ac vulputate sollicitudin, mi urna elementum augue, id tristique arcu erat non enim.",
    },
  ],
};

export default FAQ;
