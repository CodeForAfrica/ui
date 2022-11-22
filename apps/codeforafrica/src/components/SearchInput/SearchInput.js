import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import React from "react";

import SearchIcon from "@/codeforafrica/assets/icons/Type=search, Size=16, Color=CurrentColor.svg";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.25),
    position: "static",
    transform: "none",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "#5D5353",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    "&:active fieldset": {
      borderColor: theme.palette.highlight?.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-disabled": {
      color: "#D0CBCB",
      backgroundColor: theme.palette.background.main,
    },
    "&.Mui-disabled fieldset": {
      borderColor: theme.palette.grey.light,
    },
    "&.Mui-disabled:hover fieldset": {
      borderColor: theme.palette.grey.light,
    },
    "&.Mui-focused fieldset": {
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-error fieldset": {
      borderColor: theme.palette.error.main,
    },
    "& fieldset": {
      borderColor: "#D0CBCB",
      top: 0,
    },
    "& fieldset legend": {
      display: "none",
    },
  },
}));

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
    <StyledInput
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
