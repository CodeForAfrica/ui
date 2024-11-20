import { Figure } from "@commons-ui/next";
import { Box } from "@mui/material";
import React from "react";

const LongFormMedia = React.forwardRef((props, ref) => {
  const { mediaBlockFields: { image } = {} } = props;

  return (
    <Box
      sx={{
        my: 5,
      }}
      ref={ref}
    >
      {image && (
        <Figure
          ImageProps={{
            alt: image.alt,
            sx: {
              objectFit: "cover",
              position: "relative !important",
            },
            src: image.src,
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
            {image.alt}
          </figcaption>
        </Figure>
      )}
    </Box>
  );
});

export default LongFormMedia;
