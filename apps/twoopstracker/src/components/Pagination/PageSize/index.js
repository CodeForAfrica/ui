import { RichTypography } from "@commons-ui/core";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function PageSize({ value, onChange, label, options, ...props }) {
  const classes = useStyles(props);

  if (!options?.length) {
    return null;
  }
  return (
    <Box display="flex" alignItems="center" className={classes.root}>
      <RichTypography className={classes.label} variant="body2">
        {label}
      </RichTypography>
      <ToggleButtonGroup
        exclusive
        onChange={onChange}
        value={value}
        aria-label="page size"
      >
        {options.map(
          ({ label: optionLabel, value: optionValue, ...others }) => (
            <ToggleButton
              key={optionValue}
              value={optionValue}
              aria-label={optionLabel || optionValue}
              {...others}
              classes={{
                root: classes.toggleButton,
                selected: classes.toggleButtonSelected,
              }}
            >
              {optionLabel || optionValue}
            </ToggleButton>
          ),
        )}
      </ToggleButtonGroup>
    </Box>
  );
}

PageSize.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PageSize.defaultProps = {
  label: undefined,
  onChange: undefined,
  options: undefined,
  value: undefined,
};

export default PageSize;
