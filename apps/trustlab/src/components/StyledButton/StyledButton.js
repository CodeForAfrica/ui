import { Button, Box } from "@mui/material";
import React from "react";

const StyledButton = React.forwardRef(
  ({ color = "#000", children, ...props }, ref) => {
    return (
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "98%",
            backgroundColor: color,
            clipPath: "polygon(0% 0%, 75% 25%, 100% 100%, 0% 100%)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "4px",
            height: "98%",
            backgroundColor: color,
            clipPath: "polygon(0% 0%, 75% 25%, 100% 100%, 0% 100%)",
            zIndex: 0,
            transform: "rotate(180deg)",
          },
        }}
      >
        <Button
          ref={ref}
          sx={{
            backgroundColor: "transparent",
            border: "none",
            color,
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: -4,
              left: 3,
              height: "4px",
              width: "98%",
              background: `linear-gradient(to left, ${color} 0%, ${color} 100%)`,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 75%)",
              zIndex: 0,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "4px",
              width: "98%",
              background: `linear-gradient(to left, ${color} 0%, ${color} 100%)`,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 75%)",
              transform: "rotate(180deg)",
              zIndex: 0,
            },
          }}
          {...props}
        >
          {children}
        </Button>
      </Box>
    );
  },
);

export default StyledButton;
