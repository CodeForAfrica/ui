import Box from "@mui/material/Box";
import React from "react";

const BackgroundBox = React.forwardRef(function BackgroundBox(props, ref) {
  return (
    <Box
      bgcolor="neutral.dark"
      {...props}
      sx={{
        backgroundImage: {
          md: `url(/images/background-box.jpg)`,
        },
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        ...props?.sx,
      }}
      ref={ref}
    />
  );
});

export default BackgroundBox;
