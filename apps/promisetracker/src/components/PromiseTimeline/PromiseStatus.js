import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TimelineEvent from "./TimelineEvent";

function PromiseStatus({ children, color, duration, year, ...props }) {
  const width = `${
    ((year - duration[0]) * 100) / (duration[1] - duration[0])
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
        duration={duration}
        radius="8"
        year={year}
      />
    </>
  );
}

PromiseStatus.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string.isRequired,
  duration: PropTypes.arrayOf(PropTypes.number).isRequired,
  year: PropTypes.number.isRequired,
};

PromiseStatus.defaultProps = {
  children: undefined,
};
export default PromiseStatus;
