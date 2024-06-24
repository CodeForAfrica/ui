import { Alert } from "@mui/material";
import React from "react";

interface StepHintProps {
  hint: String;
}

const StepHint = ({ hint }: StepHintProps) => {
  return (
    <Alert
      severity="info"
      sx={{
        mt: -8,
        alignItems: "center",
        fontSize: {
          xs: "0.8rem",
          md: "1rem",
        },
      }}
    >
      {hint}
    </Alert>
  );
};

export default StepHint;
