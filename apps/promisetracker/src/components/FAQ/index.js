import React from "react";
import PropTypes from "prop-types";

import Accordion from "@/promisetracker/components/FAQ/Accordion";

import useStyles from "./useStyles";

function FAQ({ items, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.faqContainer}>
        {items.map((faq) => (
          <Accordion key={faq.title} square {...faq} />
        ))}
      </div>
    </div>
  );
}
FAQ.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

FAQ.defaultProps = {
  items: undefined,
};

export default FAQ;
