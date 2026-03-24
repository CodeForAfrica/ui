import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const OpportunityOverview = forwardRef(
  function OpportunityOverview(props, ref) {
    const {
      backgroundColor = "common.white",
      textColor = "text.primary",
      content,
      image,
      metrics,
    } = props;

    if (!content || !image) {
      return null;
    }

    const { url, alt } = image;

    return (
      <Box sx={{ backgroundColor }} ref={ref}>
        <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid size={{ xs: 12, sm: 6 }}>
              <LexicalRichText
                elements={content}
                sx={{
                  h1: { mb: 1, fontWeight: 700, variant: "h1" },
                  h2: { mb: 1, fontWeight: 700, variant: "h2" },
                  h3: { mb: 1, fontWeight: 700, variant: "h3" },
                }}
                TypographyProps={{
                  gutterBottom: true,
                  variant: {
                    p: "p2",
                  },
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
                  {metrics.map((metric, index) => (
                    <Box
                      key={metric.id ?? metric.value}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      {index > 0 && (
                        <Box
                          sx={{
                            width: "1px",
                            height: "1em",
                            borderRadius: "10px",
                            border: "1px solid #B2B8FF",
                            backgroundColor: "#F0F0F5",
                            mt: "4px",
                          }}
                        />
                      )}
                      <Box>
                        <Typography
                          sx={{
                            color: "#252B37",
                            fontFamily: "Inter",
                            fontSize: "26px",
                            fontWeight: 800,
                            lineHeight: "29px",
                          }}
                        >
                          {metric.value}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#252B37",
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                          }}
                        >
                          {metric.label}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Figure
                ImageProps={{
                  alt,
                  src: url,
                  sx: {
                    objectFit: "cover",
                  },
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
  },
);

export default OpportunityOverview;
