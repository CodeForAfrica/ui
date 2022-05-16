import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import React from "react";

const ChoiceChipRoot = styled(Chip, {
  slot: "Root",
  // fullWidth comes when ChoiceChip is used inside ToggleButtonGroup
  shouldForwardProp: (prop) => prop !== "fullWidth",
})(({ theme }) => ({
  ...theme.typography.body1SemiBold,
}));

const ChoiceChip = React.forwardRef(function ChoiceChip(props, ref) {
  const {
    color: colorProp = "default",
    onChange,
    onClick,
    selected = false,
    value,
    variant: variantProp = "filled",
    ...other
  } = props;
  const color = selected ? "primary" : colorProp;
  const variant = selected ? "filled" : variantProp;
  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <ChoiceChipRoot
      color={color}
      onClick={handleChange}
      value={value}
      variant={variant}
      ref={ref}
      {...other}
    />
  );
});

export default ChoiceChip;
