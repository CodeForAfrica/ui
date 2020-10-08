import React from "react";
import PropTypes from "prop-types";
import TimelineEvent from "./TimelineEvent";

function PromiseEvent({ duration, event }) {
  return (
    <>
      <TimelineEvent duration={duration} event={event} />
    </>
  );
}

PromiseEvent.propTypes = {
  duration: PropTypes.arrayOf(PropTypes.number).isRequired,
  event: PropTypes.shape({}).isRequired,
};

export default PromiseEvent;
