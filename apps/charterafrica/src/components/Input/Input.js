import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const InputRoot = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: neutral[400],
    marginBottom: theme.spacing(0.25),
    position: "static",
    transform: "none",
    backgroundColor: neutral[800],
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
