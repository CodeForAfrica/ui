import { Figure } from "@commons-ui/next";
import { Box } from "@mui/material";
import React from "react";
import { MediaBlock } from "@/roboshield/components/Content/Content";
import { Media } from "@/root/payload-types";

export default function LongFormMedia({ image }: MediaBlock) {
  const mediaImage = image as Media;
  return (
    <Box
      sx={{
        my: 5,
      }}
    >
      <Figure
        ImageProps={{
          alt: mediaImage.alt,
          sx: {
            objectFit: "cover",
            position: "relative !important",
          },
          src: mediaImage.url,
        }}
        sx={{
          height: {
            xs: "200px",
            md: "500px",
          },
          width: "100%",
        }}
      >
        <figcaption
          style={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          {mediaImage.alt}
        </figcaption>
      </Figure>
    </Box>
  );
}
