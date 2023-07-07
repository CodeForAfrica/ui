import { styled } from "@mui/material";
import React from "react";

const Span = styled("span")(({ theme }) => ({
  margin: theme.spacing(0, 1),
  fontSize: "1rem",
  fontWeight: "bold",
}));

const Separator = React.forwardRef(function Separator({ sx }, ref) {
  return (
    <Span ref={ref} sx={sx}>
      .
    </Span>
  );
});

export default Separator;
