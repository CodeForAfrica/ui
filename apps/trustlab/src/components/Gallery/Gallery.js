import { Section } from "@commons-ui/core";
import { Figure, RichTypography } from "@commons-ui/next";
import { Grid } from "@mui/material";
import React, { forwardRef } from "react";

const Gallery = forwardRef(function Gallery({ title, images }, ref) {
  if (!images?.length) {
    return null;
  }

  return (
    <Section
      sx={{
        py: 8,
        px: {
          xs: 2.5,
          sm: 0,
        },
      }}
      ref={ref}
    >
      <RichTypography
        variant="h3"
        sx={{
          mb: 5,
          borderBottom: "1px solid",
          pb: 1,
        }}
      >
        {title}
      </RichTypography>
      <Grid container spacing={2}>
        {images.map(({ image }) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Figure
              ImageProps={{
                alt: image.alt || "",
                src: image.url,
              }}
              sx={{
                m: 0,
                height: 264,
                position: "relative",
                width: "auto",
                "&:hover": {
                  filter: "none",
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
});

export default Gallery;
