import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

function Event({ event, xposition, isCurrent }) {
  const theme = useTheme();
  const yposition = "20";
  const textRef = React.createRef();
  const [textPosition, setTextPosition] = React.useState({
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
  event: PropTypes.shape().isRequired,
  xposition: PropTypes.string,
  isCurrent: PropTypes.bool,
};

Event.defaultProps = {
  isCurrent: false,
  xposition: undefined,
};
export default Event;
