import { Autocomplete, SvgIcon } from "@mui/material";
import React from "react";

import ChevronDown from "@/charterafrica/assets/icons/Type=chevron-down, Size=16, Color=CurrentColor.svg";

const findOptionIndex = (options, value, isOptionObject) => {
  return (
    options?.findIndex((o) => {
      const valueToCompare = isOptionObject ? o.value : o;
      return valueToCompare === value;
    }) ?? -1
  );
};

const findOption = (options, value, isOptionObject) => {
  const index = findOptionIndex(options, value, isOptionObject);
  return options?.[index];
};

/**
 * Assumes every option is either { value: xxx, label: "xxx" }, or just "xxx"
 */
const ComboBox = React.forwardRef(function ComboBox(props, ref) {
  const {
    label,
    multiple,
    onChange,
    options: optionsProp,
    value: valueProp,
    ...others
  } = props;
  const isOptionObject = typeof optionsProp?.[0] === "object";
  const labelValue = "";
  const labelOption = isOptionObject ? { value: labelValue, label } : label;
  const options = [labelOption, ...optionsProp];
  let selectedValue = valueProp;
  if (!selectedValue?.length) {
    const valueToUse = isOptionObject ? labelValue : label;
    selectedValue = multiple ? [valueToUse] : valueToUse;
  }
  const value = multiple
    ? selectedValue.map((v) => findOption(options, v, isOptionObject))
    : findOption(options, selectedValue, isOptionObject);

  const handleChange = (e, option) => {
    let selected;
    if (multiple) {
      const labelIndex = findOptionIndex(option, labelValue, isOptionObject);
      // Selecting label means deselecting current selection
      if (labelIndex === option.length - 1) {
        selected = labelValue;
      } else {
        selected = option?.filter((o) => {
          const optionLabel = isOptionObject ? o.label : o;
          return optionLabel !== label;
        });
        if (isOptionObject) {
          selected = selected.map((s) => s.value);
        }
      }
    } else {
      selected = isOptionObject ? option?.value : option;
    }
    if (onChange) {
      onChange(e, selected);
    }
  };

  return (
    <Autocomplete
      {...others}
      multiple={multiple}
      options={options}
      onChange={handleChange}
      value={value}
      ref={ref}
      popupIcon={
        <SvgIcon
          inheritViewBox
          sx={{
            display: "inline-flex",
            alignItems: "center",
            fill: "none",
            mt: 0.5,
          }}
          component={ChevronDown}
        />
      }
    />
  );
});

export default ComboBox;
