import { RichTypography } from "@commons-ui/core";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const LineClampedRichTypographyRoot = styled(RichTypography, {
  shouldForwardProp: (prop) => !["lineClamp"].includes(prop),
})(({ lineClamp, theme }) => ({
  ...(lineClamp && {
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    ...Object.keys(theme.breakpoints.values).reduce((acc, cur) => {
      let accBreakpoint = acc;
      if (theme.breakpoints.values[cur]) {
        accBreakpoint = {};
        acc[theme.breakpoints.up(cur)] = accBreakpoint;
      }
      let lineClampValue;
      if (typeof lineClamp !== "object") {
        lineClampValue = lineClamp;
      } else if (typeof lineClamp?.[cur] !== "object") {
        lineClampValue = lineClamp[cur];
      }
      if (lineClampValue) {
        accBreakpoint.WebkitLineClamp = lineClampValue;
        accBreakpoint.lineClamp = lineClampValue;
      }

      return acc;
    }, {}),
  }),
}));

const LineClampedRichTypography = React.forwardRef(
  function LineClampedRichTypography(props, ref) {
    return <LineClampedRichTypographyRoot {...props} ref={ref} />;
  }
);

LineClampedRichTypography.propTypes = {
  lineClamp: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.number,
    PropTypes.string,
  ]),
};

LineClampedRichTypography.defaultProps = {
  lineClamp: undefined,
};

export default LineClampedRichTypography;
