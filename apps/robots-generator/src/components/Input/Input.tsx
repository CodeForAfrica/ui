import { TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

interface InputProps {
  initialValue?: string;
  label?: string;
  onChange?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { onChange, initialValue = "", ...other } = props;

    const [value, setValue] = useState(initialValue);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      setValue(e.target.value);
    };

    useEffect(() => {
      if (onChange) {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
          onChange(value);
        }, 1000);
      }

      return () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
      };
    }, [value, onChange]);

    return (
      <TextField value={value} onChange={handleChange} {...other} ref={ref} />
    );
  },
);

export default Input;
