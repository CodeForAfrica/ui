import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { forwardRef } from "react";

const Testimonial = forwardRef(function Testimonial(props, ref) {
  const { title, description, image, signatureIcon, sx } = props;

  if (!(description && image?.src && image.width && image.height)) {
    return null;
  }
  const figureSx = {
    aspectRatio: `${image.width} / ${image.height}`,
    height: { xs: "326px", sm: "auto" },
    maxHeight: { xs: "none", sm: "326px" },
    width: { xs: "100%", sm: "326px" },
    maxWidth: { xs: "326px", sm: "none" },
  };
  return (
    <Box
      ref={ref}
      sx={[
        {
          backgroundColor: "#fff",
          py: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Grid
          container
          justifyContent="space-between"
          spacing={{ xs: 4, md: 6 }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
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
                      width: "95px",
                    },
                  }}
                  sx={{
                    display: "inline-flex",
                    height: 60,
                    width: "95px",
                  }}
                />
              </Box>
            )}
          </Grid>
          {image?.src && (
            <Grid
              size={{ xs: 12, sm: "grow" }}
              container
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              alignItems="flex-start"
            >
              <Grid>
                <Figure
                  ImageProps={{
                    alt: image.alt || "Testimonial illustration",
                    title: image.alt || "Testimonial illustration",
                    src: image.src,
                    sx: {
                      objectPosition: { xs: "left", sm: "right" },
                    },
                  }}
                  sx={{
                    ...figureSx,
                    objectPosition: { xs: "left", sm: "right" },
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Section>
    </Box>
  );
});

export default Testimonial;
