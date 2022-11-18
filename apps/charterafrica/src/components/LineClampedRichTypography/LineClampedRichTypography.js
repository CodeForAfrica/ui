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
      if (lineClamp?.[cur]) {
        accBreakpoint.WebkitLineClamp = lineClamp?.[cur];
        accBreakpoint.lineClamp = lineClamp?.[cur];
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
