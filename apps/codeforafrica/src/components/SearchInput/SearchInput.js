import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import SearchIcon from "@/codeforafrica/assets/icons/Type=search, Size=16, Color=CurrentColor.svg";
import Input from "@/codeforafrica/components/Input";

const InputSearch = React.forwardRef(function InputSearch(props, ref) {
  const { InputProps, ...other } = props;

  const endAdornment = (
    <SvgIcon
      component={SearchIcon}
      viewBox="0 0 16 16"
      sx={{
        fill: "none",
        fontSize: "16px",
      }}
    />
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
