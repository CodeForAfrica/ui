import { Card, styled } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const SpotlightCardRoot = styled(Card)(({ ownerState, theme }) => ({
  backgroundColor: "#fff",
  transition: theme.transitions.create(["border-color", "filter"]),
  width: "100%",
  "&:hover": {
    ...(ownerState.variant === "outlined" && {
      borderColor: neutral[700],
      filter: "drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.1))",
    }),
  },
  ...(ownerState.variant === "outlined" && {
    border: `2px solid transparent`,
    borderRadius: 5,
    filter: "drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.1))",
    "& .MuiCardActionArea": {
      border: `2px solid transparent`,
    },
  }),
}));

const SpotlightCard = React.forwardRef(function SpotlightCard(props, ref) {
  const {
    elevation = 0,
    square = true,
    variant = "outlined",
    ...other
  } = props;

  const ownerState = {
    ...other,
    elevation,
    square,
    variant,
  };

  return (
    <SpotlightCardRoot
      elevation={elevation}
      square={square}
      variant={variant}
      ownerState={ownerState}
      {...other}
      ref={ref}
    />
  );
});

export default SpotlightCard;
