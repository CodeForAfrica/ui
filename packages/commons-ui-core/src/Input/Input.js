import TextField from "@mui/material/TextField";
import React from "react";

const Input = React.forwardRef(function Input(props, ref) {
  const { InputLabelProps, sx, ...other } = props;

  return (
    <TextField
      InputLabelProps={{
        shrink: true,
        ...InputLabelProps,
      }}
      sx={sx}
      {...other}
      ref={ref}
    />
  );
});

export default Input;
