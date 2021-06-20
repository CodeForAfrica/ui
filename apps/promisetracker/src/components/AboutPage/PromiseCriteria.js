import { RichTypography } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import PromiseStatusList from "@/promisetracker/components/PromiseStatusList";

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
