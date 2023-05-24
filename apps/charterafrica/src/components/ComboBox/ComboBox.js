import { Autocomplete } from "@mui/material";
import React from "react";

const findOption = (options, value, separateValueAndLabel) => {
  return options.find((o) => {
    const valueToCompare = separateValueAndLabel ? o.value : o;
    return valueToCompare === value;
  });
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
  const separateValueAndLabel = typeof optionsProp?.[0] === "object";
  const labelValue = "";
  const labelOption = separateValueAndLabel
    ? { value: labelValue, label }
    : label;
  const options = [labelOption, ...optionsProp];
  let selectedValue = valueProp;
  if (!selectedValue?.length) {
    const valueToUse = separateValueAndLabel ? labelValue : label;
    selectedValue = multiple ? [valueToUse] : valueToUse;
  }
  const value = multiple
    ? selectedValue.map((v) => findOption(options, v, separateValueAndLabel))
    : findOption(options, selectedValue, separateValueAndLabel);

  const handleChange = (e, option) => {
    let selected;
    if (multiple) {
      selected = option?.filter((o) => {
        const optionLabel = separateValueAndLabel ? o.label : o;
        return optionLabel !== label;
      });
      if (separateValueAndLabel) {
        selected = selected.map((s) => s.value);
      }
    } else {
      selected = separateValueAndLabel ? option?.value : option;
    }
    if (onChange) {
      onChange(e, selected);
    }
  };

  return (
    <Autocomplete
      getOptionDisabled={(o) =>
        separateValueAndLabel ? o.value === "" : o === label
      }
      {...others}
      multiple={multiple}
      options={options}
      onChange={handleChange}
      value={value}
      ref={ref}
    />
  );
});

export default ComboBox;
