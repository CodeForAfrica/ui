import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Typography, Stack, Box, Divider } from "@mui/material";
import React from "react";

const IntelligenceBriefings = React.forwardRef(
  function IntelligenceBriefings(props, ref) {
    const { title, subtitle, description, ctaItems = [] } = props;

    return (
      <Box bgcolor="common.white">
        <Section ref={ref} sx={{ py: 4, px: { xs: 2.5, md: 0 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h1" gutterBottom>
                {title}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={3.75}>
                {description && (
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
                )}

                {subtitle && (
                  <Box>
                    <Divider sx={{ background: "black", mb: 2 }} />
                    <Typography variant="h3">{subtitle}</Typography>
                    <Divider sx={{ background: "black", mt: 2 }} />
                  </Box>
                )}

                {ctaItems.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={4}
                    justifyContent="space-between"
                  >
                    {ctaItems.map((item) => (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        key={item.title}
                        sx={{ width: 180 }}
                      >
                        <Figure
                          ImageProps={{
                            alt: item.icon.alt,
                            src: item.icon.url,
                          }}
                          sx={{
                            height: { xs: "108px", md: "180px" },
                            width: { xs: "108px", md: "180px" },
                          }}
                        />
                        <Typography
                          sx={{
                            textTransform: "uppercase",
                            maxWidth: 140,
                          }}
                          textAlign="center"
                          variant="h3"
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Section>
      </Box>
    );
  },
);

export default IntelligenceBriefings;
