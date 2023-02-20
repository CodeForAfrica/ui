import { Card, styled } from "@mui/material";

import { neutral } from "@/charterafrica/colors";

const StyledCard = styled(Card)(({ ownerState, theme }) => ({
  backgroundColor: "#fff",
  transition: theme.transitions.create(["filter", "border-color"]),
  width: "100%",
  ...(ownerState.variant === "outlined" && {
    border: `2px solid transparent`,
    borderRadius: 5,
    filter: "drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.1))",
    "& .MuiCardActionArea": {
      border: `2px solid transparent`,
    },
    "&:hover": {
      borderColor: neutral[700],
      filter: "drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.1))",
      backgroundColor: "#fff",
    },
  }),
}));

export default StyledCard;
