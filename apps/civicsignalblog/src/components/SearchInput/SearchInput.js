import { IconButton, SvgIcon } from "@mui/material";
import React from "react";

import SearchIcon from "@/civicsignalblog/assets/icons/Type=search, Size=16, Color=CurrentColor.svg";
import Input from "@/civicsignalblog/components/Input";

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
    <Input
      InputProps={{
        endAdornment,
        ...InputProps,
      }}
      type="search"
      {...other}
      ref={ref}
    />
  );
});

export default InputSearch;
