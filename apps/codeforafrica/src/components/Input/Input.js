import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";

const InputRoot = styled(TextField)(({ theme }) => ({
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
      borderColor: theme.palette.highlight.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-disabled fieldset": {
      backgroundColor: theme.palette.background.main,
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
    },
    "& fieldset legend": {
      display: "none",
    },
  },
}));

const Input = React.forwardRef(function Input(props, ref) {
  const { InputLabelProps, ...other } = props;

  return (
    <InputRoot
      InputLabelProps={{
        shrink: true,
        ...InputLabelProps,
      }}
      {...other}
      ref={ref}
    />
  );
});

export default Input;
