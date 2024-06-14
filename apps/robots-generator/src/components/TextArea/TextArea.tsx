import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

import { useDebouncedValue } from "@/robots-generator/utils/useDebounce";

interface TextAreaProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string) => void;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function TextArea(props: TextAreaProps) {
  const { onChange, value: initialValue, style, ...other } = props;

  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useDebouncedValue(value, 500, onChange);

  return (
    <TextareaAutosize
      {...other}
      value={value}
      onChange={handleChange}
      style={style}
    />
  );
}
