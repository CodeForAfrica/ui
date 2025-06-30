import React, { forwardRef } from "react";
import { Grid, Typography } from "@mui/material";

const Gallery = forwardRef(function Gallery({ title, images }, ref) {
  if (!images?.length) {
    return null;
  }
  return (
    <div ref={ref}>
      <Typography variant="h1">{title}</Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img
              src={image}
              alt={`Gallery item ${index + 1}`}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

export default Gallery;
