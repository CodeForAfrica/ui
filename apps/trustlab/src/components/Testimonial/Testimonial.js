import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { forwardRef } from "react";

const Testimonial = forwardRef(function Testimonial(props, ref) {
  const { title, description, image, signatureIcon, sx, ...other } = props;

  if (!description) {
    return null;
  }

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: "#fff",
        py: { xs: 5, md: 8 },
        ...sx,
      }}
      data-testid="testimonial"
      {...other}
    >
      <Section sx={{ px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {title && (
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                {title}
              </Typography>
            )}
            <LexicalRichText
              elements={description}
              TypographyProps={{
                variant: "p2",
                sx: {
                  color: "text.secondary",
                  lineHeight: 1.8,
                },
              }}
            />
            {signatureIcon?.src && (
              <Box sx={{ mt: 3 }}>
                <Figure
                  ImageProps={{
                    alt: signatureIcon.alt || "Signature",
                    src: signatureIcon.src,
                    sx: {
                      objectFit: "contain",
                      objectPosition: "left",
                      maxHeight: 60,
                      height: "30px",
                      width: "100%",
                    },
                  }}
                  sx={{
                    display: "inline-flex",
                    height: 60,
                    width: "100%",
                  }}
                />
              </Box>
            )}
          </Grid>
          {image?.src && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Figure
                ImageProps={{
                  alt: image.alt || "Testimonial illustration",
                  src: image.src,
                  sx: {
                    objectFit: "contain",
                    maxWidth: "100%",
                  },
                }}
                sx={{
                  position: "relative",
                  height: { xs: "calc(100vw - 40px)", md: 300 },
                  width: "100%",
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
