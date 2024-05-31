import { useDebouncedValue } from "@/robots-generator/utils/useDebounce";
import { TextField } from "@mui/material";
import React, { useState } from "react";

interface InputProps {
  initialValue?: string;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  sx?: React.CSSProperties;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { onChange, initialValue = "", disabled = false, ...other } = props;

    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    useDebouncedValue(value, 500, onChange);

    return (
      <TextField
        value={value}
        onChange={handleChange}
        {...other}
        ref={ref}
        disabled={disabled}
      />
    );
  },
);

export default Input;
