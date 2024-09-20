import React from "react";
import { IconButton } from "@mui/material";
import CopyIcon from "@/techlabblog/assets/icons/Type=copy, Size=24, Color=White.svg";
import CheckIcon from "@/techlabblog/assets/icons/Type=check-circle, Size=24, Color=White.svg";

export default function CopyCodeButton({
  children,
}: {
  children: JSX.Element;
}) {
  const [copyOk, setCopyOk] = React.useState(false);

  const handleClick = (_e: React.MouseEvent) => {
    navigator.clipboard.writeText(children.props.children);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <IconButton
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
        <CheckIcon />
      ) : (
        <CopyIcon
          sx={{
            "&:hover": {
              color: "#fff",
            },
          }}
          onClick={handleClick}
        />
      )}
    </IconButton>
  );
}
