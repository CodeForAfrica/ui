import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Typography, Grid2 as Grid, Box } from "@mui/material";
import React, { forwardRef } from "react";

const WhereWeWork = forwardRef(
  ({ title, description, backgroundColor = "#CDCDCD", image }, ref) => {
    if (!(title && image?.url)) {
      return null;
    }

    return (
      <Box ref={ref} bgcolor={backgroundColor}>
        <Section sx={{ py: 7.5, px: { xs: 2.5, md: 0 } }}>
          <Grid container spacing={4} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="display4">{title}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <LexicalRichText
                elements={description}
                TypographyProps={{
                  gutterBottom: true,
                  variant: "p2",
                  sx: {
                    mb: 0,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Figure
            ImageProps={{
              alt: image.alt,
              src: image.url,
            }}
            sx={{
              height: {
                xs: "255px",
                sm: "401px",
                md: "537px",
              },
              width: "100%",
            }}
          />
        </Section>
      </Box>
    );
  },
);

export default WhereWeWork;
