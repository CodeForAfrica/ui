import React from "react";
import { Tooltip, IconButton, Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

interface SkipToLastStepProps {
  handleSkipToLast: () => void;
  lastStep: boolean;
}

const SkipToLastStep = ({
  handleSkipToLast,
  lastStep,
}: SkipToLastStepProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        width: "100%",
        position: "relative",
        left: "2%",
        top: "-150px",
      }}
    >
      <Tooltip title="View current robots.txt file">
        <IconButton
          onClick={handleSkipToLast}
          sx={{
            color: lastStep ? "#FFFFFF" : "#1120E1",
            backgroundColor: lastStep ? "#1120E1" : "#FFFFFF",
            border: "1px solid #1120E1",
            " :hover": {
              backgroundColor: "#1120E1",
              color: "#FFFFFF",
            },
          }}
        >
          <CodeIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SkipToLastStep;
