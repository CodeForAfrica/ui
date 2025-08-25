import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Typography, Stack, Divider, Box } from "@mui/material";
import React, { forwardRef } from "react";

const Helplines = forwardRef(function Helplines({ title, briefs = [] }, ref) {
  return (
    <Box bgcolor="common.white">
      <Section
        ref={ref}
        sx={{ background: "common.white", py: 4, px: { xs: 2.5, md: 0 } }}
      >
        <Stack spacing={4}>
          <Typography variant="display4">{title}</Typography>
          <Grid container sx={{ ml: -2 }} spacing={2}>
            {briefs.map((brief) => (
              <Grid size={{ xs: 12, sm: 4 }} key={brief.title}>
                <Stack
                  component={brief?.link?.href ? Link : "div"}
                  href={brief?.link?.href}
                  alignItems={{
                    sm: "center",
                    textDecoration: "none",
                  }}
                  gap={2}
                >
                  <Figure
                    ImageProps={{
                      alt: brief.icon.alt,
                      src: brief.icon.url,
                    }}
                    sx={{
                      height: { xs: "108px", md: "180px" },
                      width: { xs: "108px", md: "180px" },
                      alignSelf: "center",
                    }}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Divider
                      sx={{
                        background: "black",
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      {brief.title}
                    </Typography>
                    <Divider
                      sx={{
                        background: "black",
                        mt: 2,
                      }}
                    />
                  </Box>

                  <LexicalRichText
                    elements={brief.description}
                    TypographyProps={{
                      gutterBottom: true,
                      variant: "p2",
                      sx: {
                        mb: 0,
                        textDecoration: "none",
                      },
                    }}
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Section>
    </Box>
  );
});

export default Helplines;
