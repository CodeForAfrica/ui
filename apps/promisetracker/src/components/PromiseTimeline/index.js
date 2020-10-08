import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Labels from "./Labels";
import PromiseEvent from "./PromiseEvent";
import PromiseStatus from "./PromiseStatus";

function Index({ duration, events, status }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <svg width="100%" height="140">
        <rect
          x="8"
          y="69"
          width="100%"
          height="2"
          style={{
            fill: "#EBEBEB",
          }}
        />
        {isDesktop &&
          events.map((event) => (
            <>
              <PromiseEvent
                key={event.label}
                duration={duration}
                event={event}
              />
            </>
          ))}
        <PromiseStatus duration={duration} status={status}>
          <rect
            x="8"
            y="69"
            width="100%"
            height="2"
            style={{
              fill: "#EBEBEB",
            }}
          />
        </PromiseStatus>
        <Labels duration={duration} />
      </svg>
    </>
  );
}

Index.propTypes = {
  duration: PropTypes.arrayOf(PropTypes.number),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      year: PropTypes.number,
      color: PropTypes.string,
    })
  ),
  status: PropTypes.shape({}),
};
Index.defaultProps = {
  duration: [2012, 2018],
  events: [
    { year: 2017, label: "Event A", color: "white" },
    { year: 2015, label: "Event B", color: "white" },
    { year: 2013, label: "Delayed", color: "#FFB322" },
  ],
  status: { year: 2013, label: "Delayed", color: "#FFB322" },
};

export default Index;
