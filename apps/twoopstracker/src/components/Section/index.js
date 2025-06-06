import { Section as CuiSection } from "@commons-ui/core";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  root: {
    padding: `0 ${typography.pxToRem(20)}`,
  },
  /* Styles applied to the root element if `fixed={true}`. */
  fixed: Object.keys(widths.values).reduce((acc, breakpoint) => {
    const value = widths.values[breakpoint];
    if (value !== 0) {
      acc[breakpoints.up(breakpoint)] = {
        overflow: "hidden",
        padding: 0,
        width: value,
      };
    }
    return acc;
  }, {}),
}));

function Section({ className, fixed = false, ...props }) {
  const classes = useStyles(props);

  return (
    <CuiSection
      {...props}
      className={clsx(
        classes.root,
        {
          [classes.fixed]: fixed,
        },
        className,
      )}
      classes={{}}
    />
  );
}

Section.propTypes = {
  className: PropTypes.string,
  fixed: PropTypes.bool,
};

Section.defaultProps = {
  className: undefined,
  fixed: true,
};

export default Section;
