import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SvgIcon,
  InputLabel,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { uniqueId } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";

import useStyles from "./useStyles";

import ExpandMore from "@/climatemappedafrica/assets/icons/expand_more.svg";

function ExpandMoreIcon(props) {
  return <SvgIcon {...props} component={ExpandMore} />;
}

function Input({
  disabled,
  helperText,
  label: labelProp,
  onChange,
  onOpen,
  onClose,
  open,
  options,
  selected,
  placeholder,
  ...props
}) {
  const classes = useStyles(props);
  const [value, setValue] = useState();
  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };
  const labelId = labelProp ? uniqueId(`${labelProp}_`) : undefined;

  return (
    <FormControl
      variant="filled"
      size="small"
      disabled={disabled}
      className={classes.formControl}
    >
      {helperText ? (
        <FormHelperText className={classes.helper}>{helperText}</FormHelperText>
      ) : null}
      {labelId ? (
        <InputLabel htmlFor={labelId} shrink className={classes.inputLabel}>
          <Typography variant="caption" className={classes.label}>
            {labelProp}
          </Typography>
        </InputLabel>
      ) : null}
      <Select
        labelId={labelId}
        displayEmpty
        disableUnderline
        onChange={handleChange}
        onOpen={onOpen}
        onClose={onClose}
        open={open}
        defaultValue={selected || ""}
        IconComponent={ExpandMoreIcon}
        MenuProps={{
          classes: {
            paper: classes.paper,
            list: classes.list,
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          disableScrollLock: true,
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
        classes={{
          root: classes.select,
          filled: clsx(classes.filled, { [classes.filledPlaceholder]: !value }),
        }}
      >
        {placeholder ? (
          <MenuItem value="" className={classes.placeholder}>
            {placeholder}
          </MenuItem>
        ) : null}
        {options?.map((option) => {
          const optionLabel = option?.label ?? option;
          const optionValue = option?.value ?? option;
          const optionDisabled = option?.disabled;
          return (
            <MenuItem
              key={optionValue}
              disabled={optionDisabled}
              value={optionValue}
            >
              {optionLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

Input.propTypes = {
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  selected: PropTypes.string,
};

export default Input;
