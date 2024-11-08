import { RichTypography } from "@commons-ui/legacy";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState, forwardRef } from "react";

const Legend = forwardRef(function Legend({ data, title }, ref) {
  const [hoveredValue, setHoveredValue] = useState(null);

  const handleMouseEnter = (value) => {
    setHoveredValue(value);
  };

  const handleMouseLeave = () => {
    setHoveredValue(null);
  };

  return (
    <Box>
      <RichTypography variant="caption" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </RichTypography>
      <Box ref={ref} display="flex" alignItems="center">
        {data.map((item) => (
          <Box
            key={`${item.min} - ${item.max}`}
            onMouseEnter={() => handleMouseEnter(`${item.min} - ${item.max}`)}
            onMouseLeave={handleMouseLeave}
            sx={{
              backgroundColor: item.color,
              height: 24,
              minWidth: 24,
              cursor: "pointer",
            }}
          />
        ))}
        {hoveredValue && (
          <RichTypography
            variant="caption"
            sx={{ marginLeft: 2, whiteSpace: "nowrap" }}
          >
            {hoveredValue}
          </RichTypography>
        )}
      </Box>
    </Box>
  );
});

Legend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Legend;
