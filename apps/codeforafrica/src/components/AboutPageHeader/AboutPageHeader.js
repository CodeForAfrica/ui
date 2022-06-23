import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const AboutPageHeader = React.forwardRef(function AboutPageHeader(props, ref) {
  const { background } = props;
  return (
    <Box
      ref={ref}
      sx={{ width: "100vw", position: "relative", height: "400px" }}
    >
      <Image
        alt={background.alt}
        objectFit="cover"
        layout="fill"
        src={background.src}
      />
    </Box>
  );
});

export default AboutPageHeader;
