import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

function Event({ color, interval, radius, textColor, title, year }) {
  const theme = useTheme();
  const xposition = `${
    ((year - interval[0]) * 100) / (interval[1] - interval[0])
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
        r={radius}
        stroke="#F7F7F7"
        strokeWidth="1"
        fill={color}
      />
      <rect
        width={`${textPosition.width * 2}`}
        height={`${textPosition.height * 2}`}
        x={`${textPosition.x - textPosition.width / 2}`}
        y={`${textPosition.y - textPosition.height / 2}`}
        fill={color}
        rx="8"
      />
      <text
        ref={textRef}
        x={xposition}
        y={yposition}
        fill={textColor}
        stroke="#202020"
        strokeWidth=".1"
        fontFamily={theme.typography.h6.fontFamily}
        fontSize={theme.typography.h6.fontSize}
        fontWeight={600}
      >
        {title.toUpperCase()}
      </text>
    </>
  );
}

Event.propTypes = {
  color: PropTypes.string.isRequired,
  interval: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius: PropTypes.string,
  textColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

Event.defaultProps = {
  radius: "4",
};
export default Event;
