import React from "react";
import PropTypes from "prop-types";

import { Section } from "@commons-ui/core";

import Accordion from "@/promisetracker/components/FAQ/Accordion";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints, palette }) => ({
  section: {},
  sectionTitle: {
    borderBottom: `.4rem solid ${palette.primary.dark}`,
    fontWeight: 600,
    marginBottom: typography.pxToRem(0),
    marginTop: typography.pxToRem(38),
    width: "min-content",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: typography.pxToRem(80),
      borderBottom: `5px solid ${palette.primary.dark}`,
    },
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(60),
    },
  },
  faqContainer: {
    marginBottom: "2.5rem",
    width: "100%",
    MaxWidth: "43rem",
  },
}));

function FAQ({ faqs, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Section
      title={title}
      titleProps={{ variant: "h1" }}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      <div className={classes.faqContainer}>
        {faqs.map((faq) => (
          <Accordion key={faq} faq={faq} />
        ))}
      </div>
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
