import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import TimelineEvent from "./TimelineEvent";

import config from "@/promisetracker/config";

function PromiseStatus({ children, color, date: dateProp, ...props }) {
  const interval = config.promiseInterval;
  const date = new Date(dateProp);
  const year = date.getFullYear() + (date.getMonth() + 1) / 12; // current year + month as a fraction of year eg 2020.8
  const width = `${
    ((year - interval[0]) * 100) / (interval[1] - interval[0])
  }%`;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <rect
        x="8"
        y="65"
        width={width}
        height="10"
        style={{
          fill: color,
        }}
      />
      {isDesktop && children}
      <TimelineEvent
        {...props}
        color={color}
        interval={interval}
        radius="8"
        year={year}
      />
    </>
  );
}

PromiseStatus.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string.isRequired,
  date: PropTypes.number,
};

PromiseStatus.defaultProps = {
  children: undefined,
  date: undefined,
};
export default PromiseStatus;
