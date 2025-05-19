import PropTypes from "prop-types";
import React from "react";

function TabPanel({ children, value, name, selected, ...props }) {
  if (selected !== value || !children) {
    return null;
  }
  return (
    <div
      role="tabpanel"
      hidden={selected !== value}
      id={`${name}-tabpanel-${value}`}
      aria-labelledby={`${name}-tab-${value}`}
      {...props}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TabPanel;
