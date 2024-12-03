import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SvgIcon,
  InputLabel,
  Typography,
} from "@mui/material";
import { uniqueId } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";

import ExpandMore from "@/climatemappedafrica/assets/icons/expand_more.svg";

function ExpandMoreIcon(props) {
  return <SvgIcon {...props} component={ExpandMore} />;
}

function Input({
  SelectProps,
  MenuProps,
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
}) {
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
      sx={{
        "& .MuiFilledInput-underline": {
          "&::before": {
            display: "none",
          },
        },
      }}
    >
      {helperText ? (
        <FormHelperText
          sx={({ typography }) => ({
            fontSize: {
              xs: typography.pxToRem(10),
            },
            fontWeight: "700",
            color: "#666666",
            textTransform: "uppercase",
            marginLeft: 0,
            marginBottom: typography.pxToRem(5),
          })}
        >
          {helperText}
        </FormHelperText>
      ) : null}
      {labelId ? (
        <InputLabel
          htmlFor={labelId}
          shrink
          sx={({ typography }) => ({
            marginTop: typography.pxToRem(15),
          })}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#959696",
            }}
          >
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
          sx: ({ typography }) => ({
            "& .MuiMenu-paper": {
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              backgroundColor: "#F8F8F8",
              marginTop: typography.pxToRem(5),
              boxShadow: "none",
              "&.MuiPaper-rounded": {
                borderRadius: "0",
              },
            },
            ...MenuProps,
          }),
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
        sx={({ typography, palette }) => ({
          width: {
            sx: typography.pxToRem(135),
            lg: typography.pxToRem(185),
          },
          background: palette.background.paper,
          color: "#959696",
          borderStyle: "none",
          borderRadius: 2,
          paddingBottom: typography.pxToRem(15),
          paddingTop: typography.pxToRem(15),
          fontSize: `${typography.caption.fontSize} !important`,
          "&:focus": {
            borderRadius: 2,
            background: palette.background.paper,
            borderColor: "none",
          },
          "&::before": {
            display: "none",
          },
          "& .MuiSelect-filled": {
            color: value ? "#959696" : "unset",
          },
          "& .MuiSelect-filled:focus": {
            borderRadius: 0,
          },
          ...SelectProps,
        })}
      >
        {placeholder ? (
          <MenuItem
            value=""
            sx={{
              color: "#959696",
              "&.Mui-selected": {
                display: "none",
              },
            }}
          >
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
