import { Box, IconButton, SvgIcon, alpha, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import PinIconDefault from "@/climatemappedafrica/assets/pinBlack.svg";
import PinIconSelected from "@/climatemappedafrica/assets/pinSelected.svg";
import Select from "@/climatemappedafrica/components/Select";

function PinIcon(props) {
  return <SvgIcon {...props} />;
}

function PinAndCompare({
  helperText,
  isMobile = false,
  currentGeographyCode,
  locations,
  onChange,
  onClickPin,
  onClose,
  placeholder,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const options = locations
    ?.filter(({ code }) => code !== currentGeographyCode)
    ?.map(({ code: value, name: label }) => ({
      label,
      value,
    }))
    ?.sort((a, b) => a?.label?.localeCompare(b?.label));

  const handleButtonClick = (e) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);
    if (!open && onClickPin) {
      onClickPin(e);
    }
  };

  const handleClose = (e) => {
    setOpen(false);
    if (onClose) {
      onClose(e);
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClick = (e) => {
    setOpen(true);
    if (!isMobile && onClickPin) {
      onClickPin(e);
    }
  };
  const component = open ? PinIconSelected : PinIconDefault;

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      sx={({ palette, typography }) => ({
        padding: `${typography.pxToRem(20)} 0`,
        borderBottom: `solid 1px ${palette.divider}`,
      })}
    >
      {!isMobile && (
        <IconButton
          onClick={handleButtonClick}
          sx={({ palette, typography }) => ({
            maxHeight: typography.pxToRem(40),
            maxWidth: typography.pxToRem(40),
            overflow: "hidden",
            padding: 0,
            marginRight: typography.pxToRem(14),
            backgroundColor: palette.grey.light,
            borderRadius: "0px 2px 2px 0px",
            boxShadow: `0px 3px 6px ${alpha(palette.common.black, 0.16)}`, // #00000029
            "&:hover,&:focus,&:focus-within": {
              backgroundColor: palette.grey.light,
            },
          })}
          size="large"
        >
          <PinIcon
            color="primary"
            component={component}
            style={{ fontSize: 60 }}
            viewBox="0 0 62 55"
          />
        </IconButton>
      )}
      <Select
        helperText={isMobile ? placeholder : helperText}
        onChange={handleChange}
        open={open}
        onOpen={handleClick}
        onClose={handleClose}
        options={options}
        placeholder={placeholder}
        selected={selected}
        SelectProps={{
          width: theme.typography.pxToRem(205),
          height: theme.typography.pxToRem(40),
          paddingLeft: 0,
          "& .MuiSelect-filled": {
            padding: `${theme.typography.pxToRem(10)} 0 ${theme.typography.pxToRem(
              10,
            )} ${theme.typography.pxToRem(15)} !important`,
          },
        }}
        MenuProps={{
          "& .MuiMenu-paper": {
            height: theme.typography.pxToRem(310),
            boxShadow: "none",
          },
          "& .MuiMenu-list": {
            padding: `${theme.typography.pxToRem(10)} 0 ${theme.typography.pxToRem(
              10,
            )} ${theme.typography.pxToRem(15)} !important`,
          },
        }}
      />
    </Box>
  );
}

PinAndCompare.propTypes = {
  helperText: PropTypes.string,
  isMobile: PropTypes.bool,
  currentGeographyCode: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func,
  onClickPin: PropTypes.func,
  onClose: PropTypes.func,
  placeholder: PropTypes.string,
};

export default PinAndCompare;
