import PropTypes from "prop-types";
import React from "react";

import RichData from "./RichData";

function PanelItem({ item = undefined, ...props }) {
  const key = item.value;
  switch (key) {
    case "rich-data": // fallthrough
    default:
      return <RichData {...props} />;
  }
}

PanelItem.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default PanelItem;
