import React from "react";
import { CopyAll } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/material";

export default function CodeCopyBtn({ children }: { children: JSX.Element }) {
  const [copyOk, setCopyOk] = React.useState(false);

  const iconColor = copyOk ? "#0af20a" : "#ddd";

  const handleClick = (_e: React.MouseEvent) => {
    navigator.clipboard.writeText(children.props.children);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        color: "white",
        position: "absolute",
        top: "10px",
        right: "10px",
        fontSize: "1.5em",
        cursor: "pointer",
        transition: "all 0.3s ease -in -out",
      }}
    >
      {copyOk ? (
        <DoneIcon
          sx={{
            color: iconColor,
          }}
        />
      ) : (
        <CopyAll
          sx={{
            color: iconColor,
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={handleClick}
        />
      )}
    </Box>
  );
}
