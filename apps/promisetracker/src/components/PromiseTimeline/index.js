import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Labels from "./Labels";
import Event from "./Event";

function Index({ duration, events }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <svg width="100%" height="140">
        {!isDesktop && (
          <rect
            x="8"
            y="69"
            width="100%"
            height="2"
            style={{
              fill: "#EBEBEB",
            }}
          />
        )}
        <rect
          x="8"
          y="65"
          width="15%"
          height="10"
          style={{
            fill: events.find((event) => event.isCurrent).color,
          }}
        />
        {isDesktop && (
          <rect
            x="8"
            y="69"
            width="100%"
            height="2"
            style={{
              fill: "#EBEBEB",
            }}
          />
        )}

        <Labels duration={duration} />
        {events.map((event) => (
          <>
            {(isDesktop || event.isCurrent) && (
              <Event
                key={event.label}
                duration={duration}
                event={event}
                isCurrent
              />
            )}
          </>
        ))}
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
      isCurrent: PropTypes.bool,
    })
  ),
};
Index.defaultProps = {
  duration: [2012, 2018],
  events: [
    { year: 2017, label: "Event A", color: "white" },
    { year: 2015, label: "Event B", color: "white" },
    { year: 2013, label: "Delayed", color: "#FFB322", isCurrent: true },
  ],
};

export default Index;
