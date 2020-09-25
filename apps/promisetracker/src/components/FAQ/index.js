import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { Section } from "@commons-ui/core";

import Accordion from "@/promisetracker/components/FAQ/Accordion";
import H1 from "@/promisetracker/components/H1";

import useStyles from "./useStyles";

function FAQ({ items, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Section
      title={title}
      titleProps={{ component: H1 }}
      classes={{ root: classes.section, title: classes.sectionTitle }}
    >
      {items?.length > 0 && (
        <Grid container className={classes.root}>
          <Grid item xs={12} lg={8}>
            <div className={classes.faqContainer}>
              {items.map((faq) => (
                <Accordion key={faq.title} faq={faq} />
              ))}
            </div>
          </Grid>
        </Grid>
      )}
    </Section>
  );
}
FAQ.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

FAQ.defaultProps = {
  title: null,
  items: null,
};

export default FAQ;
