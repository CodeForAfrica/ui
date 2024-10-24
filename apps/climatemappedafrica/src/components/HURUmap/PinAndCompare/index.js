import { Box, IconButton, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import useStyles from "./useStyles";

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
    <Box display="flex" alignItems="flex-end" className={classes.root}>
      {!isMobile && (
        <IconButton
          onClick={handleButtonClick}
          className={classes.pinButton}
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
