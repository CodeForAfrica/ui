import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const SectionRoot = styled(Container, {
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { fixed } = props.ownerState;
    return [styles.root, fixed && styles.fixed];
  },
})(
  ({ ownerState, theme }) =>
    ownerState.fixed &&
    Object.keys(theme.contentWidths.values).reduce((acc, breakpoint) => {
      const value = theme.contentWidths.values[breakpoint];

      if (value) {
        acc[theme.breakpoints.up(breakpoint)] = {
          maxWidth: `${value}${theme.contentWidths.unit}`,
        };
      }
      return acc;
    }, {})
);

/**
 * Section is a special Container that uses theme.contentWidths to set the
 * max-width of the container instead of using the full breakpoints values.
 * This is only applicable when fixed is true.
 */
const Section = React.forwardRef(function Section(props, ref) {
  const { fixed = true, ...others } = props;
  const ownerState = { ...others, fixed };

  return (
    <SectionRoot {...props} fixed={fixed} ownerState={ownerState} ref={ref} />
  );
});

Section.propTypes = {
  fixed: PropTypes.bool,
};

Section.defaultProps = {
  fixed: undefined,
};

export default Section;
