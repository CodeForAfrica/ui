import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
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
    <TextField
      InputProps={{
        endAdornment,
        ...InputProps,
        placeholder: "Search",
        size: "small",
      }}
      sx={{
        minWidth: { xs: "auto", sm: "140px" },
        width: { xs: "auto", sm: "140px" },
        backgroundColor: neutral[800],
        borderColor: neutral[400],
        input: {
          "&::placeholder": {
            color: neutral[400],
          },
          color: neutral[400],
        },
      }}
      type="search"
      {...other}
      ref={ref}
    />
  );
});

export default InputSearch;
