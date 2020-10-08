import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TimelineEvent from "./TimelineEvent";

function PromiseStatus({ children, duration, status }) {
  const width = `${
    ((status.year - duration[0]) * 100) / (duration[1] - duration[0])
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
          fill: status.color,
        }}
      />
      {isDesktop && children}
      <TimelineEvent duration={duration} event={status} radius="8" />
    </>
  );
}

PromiseStatus.propTypes = {
  duration: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.shape({
    year: PropTypes.number,
    color: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

PromiseStatus.defaultProps = {
  children: undefined,
};
export default PromiseStatus;
