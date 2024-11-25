import { Box, IconButton, SvgIcon, alpha } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import PinIconDefault from "@/climatemappedafrica/assets/pinBlack.svg";
import PinIconSelected from "@/climatemappedafrica/assets/pinSelected.svg";
import Select from "@/climatemappedafrica/components/Select";

// useStyles uses import/definition order to determine how classes are ordered.
// eslint-disable-next-line import/order
import useStyles from "./useStyles";

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
  ...props
}) {
  const classes = useStyles(props);
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
        classes={{
          select: classes.locationSelect,
          paper: classes.selectPaper,
          filled: classes.filled,
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
