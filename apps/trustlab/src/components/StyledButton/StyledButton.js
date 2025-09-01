import { Button, Box } from "@mui/material";
import React from "react";

const StyledButton = React.forwardRef(
  (
    {
      color = "#000",
      bgcolor = "transparent",
      sx,
      children,
      buttonProps = {},
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        sx={[
          {
            position: "relative",
            display: "inline-block",
            // top
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
            // right
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
          },
          ...(Array.isArray(props.sx) ? sx : [sx]),
        ]}
      >
        <Box
          sx={{
            position: "absolute",
            top: -4,
            left: 6,
            zIndex: 10,
            width: "34px",
            height: "8px",
            backgroundColor: bgcolor,
            transform: "rotate(12deg)",
          }}
        />
        <Button
          ref={ref}
          sx={[
            {
              backgroundColor: "transparent",
              border: "none",
              color,
              fontWeight: 700,
              height: 54,
              minWidth: 100,
              fontSize: 18,
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: -4,
                left: 2,
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
              px: 2,
              py: 3,
            },

            ...(Array.isArray(buttonProps.sx)
              ? buttonProps.sx
              : [buttonProps.sx]),
          ]}
          {...props}
        >
          {children}
        </Button>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 6,
            zIndex: 10,
            width: "34px",
            height: "8px",
            backgroundColor: bgcolor,
            transform: "rotate(12deg)",
          }}
        />
      </Box>
    );
  },
);

export default StyledButton;
