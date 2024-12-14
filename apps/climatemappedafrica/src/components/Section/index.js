import { Section as CuiSection } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

function Section({ className, fixed = true, sx, ...props }) {
  return (
    <CuiSection
      {...props}
      sx={({ breakpoints, typography, widths }) => ({
        padding: `0 ${typography.pxToRem(20)}`,
        ...Object.keys(widths.values).reduce((acc, breakpoint) => {
          const value = widths.values[breakpoint];
          if (value !== 0 && fixed) {
            acc[breakpoints.up(breakpoint)] = {
              padding: 0,
              width: value,
            };
          }
          return acc;
        }, {}),
        ...sx,
      })}
    />
  );
}

Section.propTypes = {
  className: PropTypes.string,
  fixed: PropTypes.bool,
};

export default Section;
