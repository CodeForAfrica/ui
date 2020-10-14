import React from "react";
import PropTypes from "prop-types";

import { RichTypography } from "@commons-ui/core";

import PromiseStatusList from "@/promisetracker/components/PromiseStatusList";

import useStyles from "./useStyles";

function PromiseCriteria({ items, title, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.criteria}>
      {title?.length && (
        <RichTypography
          component="h2"
          variant="h5"
          className={classes.criteriaTitle}
        >
          {title}
        </RichTypography>
      )}
      <PromiseStatusList
        items={items}
        classes={{ root: classes.criteriaItems }}
      />
    </div>
  );
}

PromiseCriteria.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

PromiseCriteria.defaultProps = {
  items: undefined,
  title: undefined,
};

export default PromiseCriteria;
