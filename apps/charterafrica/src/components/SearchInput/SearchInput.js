import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import SearchIcon from "@/charterafrica/assets/icons/Type=search, Size=16, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";

const InputSearch = React.forwardRef(function InputSearch(props, ref) {
  const { InputProps, onClick, onMouseDown, ...other } = props;
  const handleMouseDownSearch = (e) => {
    e.preventDefault();
  };

  const endAdornment = (
    <IconButton
      aria-label="search"
      onClick={onClick}
      onMouseDown={onMouseDown || handleMouseDownSearch}
      sx={{
        p: 0,
      }}
    >
      <SvgIcon
        component={SearchIcon}
        viewBox="0 0 16 16"
        sx={{
          color: "inherit",
          fill: "none",
          fontSize: "16px",
        }}
      />
    </IconButton>
  );
  return (
    <OutlinedInput
      endAdornment={endAdornment}
      label="Search"
      placeholder="Search"
      size="small"
      type="search"
      {...other}
      sx={{
        width: "140px",
        backgroundColor: neutral[800],
        ...other?.sx,
      }}
      ref={ref}
    />
  );
});

export default InputSearch;
