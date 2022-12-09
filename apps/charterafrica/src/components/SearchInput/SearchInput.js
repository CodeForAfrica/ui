import { OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import SearchIcon from "@/charterafrica/assets/icons/Type=search, Size=16, Color=Black.svg";
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
      edge="end"
    >
      <SvgIcon
        component={SearchIcon}
        viewBox="0 0 16 16"
        sx={{
          fill: "none",
          fontSize: "16px",
        }}
      />
    </IconButton>
  );
  return (
    <OutlinedInput
      endAdornment={endAdornment}
      placeholder="Search"
      size="small"
      sx={{
        width: "140px",
        height: "40px",
        backgroundColor: neutral[800],
      }}
      type="search"
      {...other}
      ref={ref}
    />
  );
});

export default InputSearch;
