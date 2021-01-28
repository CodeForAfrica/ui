import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import config from "@/promisetracker/config";

function Event({ color, isOdd, radius, textColor, title, year }) {
  const interval = config.promiseInterval;
  const theme = useTheme();
  const xposition = `${
    ((year - interval[0]) * 100) / (interval[1] - interval[0])
  }%`;
  const yposition = isOdd ? "50" : "20";
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
        width={`${textPosition.width * 1.5}`}
        height={`${textPosition.height * 2}`}
        x={`${textPosition.x - (textPosition.width * 1.5) / 6}`}
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
        {title?.toUpperCase()}
      </text>
    </>
  );
}

Event.propTypes = {
  color: PropTypes.string,
  isOdd: PropTypes.number,
  radius: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

Event.defaultProps = {
  radius: "4",
  isOdd: false,
  color: "#fff",
  textColor: "#202020",
};
export default Event;
