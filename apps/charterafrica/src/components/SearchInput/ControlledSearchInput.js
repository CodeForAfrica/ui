import React, { useState } from "react";

import SearchInput from "./SearchInput";

function ControlledSearchInput({ onChange, value: valueProp, ...other }) {
  const [value, setValue] = useState(valueProp);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleClick = (e) => {
    if (onChange) {
      onChange(e, value);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (onChange) {
        onChange(e, value);
      }
    }
  };

  return (
    <SearchInput
      {...other}
      onChange={handleChange}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      value={value}
    />
  );
}

export default ControlledSearchInput;
