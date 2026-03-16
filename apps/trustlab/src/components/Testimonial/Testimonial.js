import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const Testimonial = forwardRef(function Testimonial(props, ref) {
  const { title, content, logo, image } = props;

  if (!content) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: "common.white" }} ref={ref}>
      <Section sx={{ py: { xs: 0, sm: 8 }, px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, sm: 7 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "29px",
                color: "#252B37",
                mb: 2,
              }}
            >
              {title}
            </Typography>
            <LexicalRichText
              elements={content}
              TypographyProps={{
                variant: "p2",
                sx: { color: "#02041C" },
              }}
            />
            {logo?.url && (
              <Box sx={{ mt: 3 }}>
                <Figure
                  ImageProps={{
                    alt: logo.alt || "",
                    src: logo.url,
                    style: { objectFit: "contain", objectPosition: "left" },
                  }}
                  sx={{
                    m: 0,
                    height: 40,
                    width: 120,
                    position: "relative",
                  }}
                />
              </Box>
            )}
          </Grid>
          {image?.url && (
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <Figure
                ImageProps={{
                  alt: image.alt || "",
                  src: image.url,
                  style: { objectFit: "contain" },
                }}
                sx={{
                  m: 0,
                  height: { xs: 200, sm: 280 },
                  width: { xs: 200, sm: 280 },
                  position: "relative",
                }}
              />
            </Grid>
          )}
        </Grid>
      </Section>
    </Box>
  );
});

export default Testimonial;
