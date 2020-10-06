import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

function Event({ duration, event, isCurrent }) {
  const theme = useTheme();
  const xposition = `${
    ((event.year - duration[0]) * 100) / (duration[1] - duration[0])
  }%`;
  const yposition = "20";
  const textRef = useRef();
  const [textPosition, setTextPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (textRef.current) {
      setTextPosition(textRef.current.getBBox());
    }
  }, [textRef]);

  return (
    <>
      <circle
        cx={xposition}
        cy="70"
        r={isCurrent ? "8" : "4"}
        stroke="#F7F7F7"
        strokeWidth="1"
        fill={event.color}
      />
      <rect
        width={`${textPosition.width * 2}`}
        height={`${textPosition.height * 2}`}
        x={`${textPosition.x - textPosition.width / 2}`}
        y={`${textPosition.y - textPosition.height / 2}`}
        fill={event.color}
        rx="8"
      />
      <text
        ref={textRef}
        x={xposition}
        y={yposition}
        stroke="#202020"
        strokeWidth=".1"
        fontFamily={theme.typography.h6.fontFamily}
        fontSize={theme.typography.h6.fontSize}
        fontWeight={600}
      >
        {event.label.toUpperCase()}
      </text>
    </>
  );
}

Event.propTypes = {
  duration: PropTypes.arrayOf(PropTypes.number).isRequired,
  event: PropTypes.shape().isRequired,
  isCurrent: PropTypes.bool,
};

Event.defaultProps = {
  isCurrent: false,
};
export default Event;
