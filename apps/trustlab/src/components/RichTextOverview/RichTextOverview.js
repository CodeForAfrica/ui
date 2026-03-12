import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const RichTextOverview = forwardRef((props, ref) => {
  const {
    backgroundColor = "common.white",
    textColor = "text.primary",
    content,
    image,
    metrics,
  } = props;

  if (!content && !image) {
    return null;
  }

  const { url, alt } = image;

  return (
    <Box sx={{ backgroundColor }} ref={ref}>
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} sm={6}>
            <LexicalRichText
              elements={content}
              sx={{
                p: { mb: 2 },
                h3: { mb: 1 },
              }}
              TypographyProps={{
                gutterBottom: true,
                sx: {
                  mb: 2,
                  color: textColor,
                },
              }}
            />
            {metrics?.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  width: "100%",
                  borderRadius: "0 10px 10px 0",
                  backgroundColor: "#F0F0F5",
                  borderLeft: "3px solid #1020E1",
                  px: 2,
                  py: 1.5,
                }}
              >
                {metrics.map((metric) => (
                  <Box key={metric.id ?? metric.value}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: textColor,
                        lineHeight: 1.2,
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: textColor }}>
                      {metric.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Figure
              ImageProps={{
                alt,
                src: url,
              }}
              sx={{
                height: { xs: "374px", md: "420px" },
                m: 0,
                position: "relative",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default RichTextOverview;
