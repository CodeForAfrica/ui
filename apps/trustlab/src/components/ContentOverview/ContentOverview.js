import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const NAVBAR_HEIGHT = 94;

const headingSx = {
  fontFamily: "Inter",
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "32px",
  letterSpacing: "0.07px",
  color: "#0A1628",
};

const bodySx = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  color: "#252B37",
};

const ContentOverview = forwardRef(function ContentOverview(props, ref) {
  const { content, card } = props;

  if (!content || !card) {
    return null;
  }

  const { title, cardType, items, richContent } = card;

  return (
    <Box sx={{ backgroundColor: "common.white" }} ref={ref}>
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, sm: 6 }}>
            <LexicalRichText
              elements={content}
              sx={{
                "h1, h2, h3, h4, h5, h6": {
                  ...headingSx,
                  mb: 1,
                },
                p: { mb: 2 },
              }}
              TypographyProps={{
                gutterBottom: true,
                sx: bodySx,
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              position: { xs: "relative", sm: "sticky" },
              top: { sm: `calc(${NAVBAR_HEIGHT}px + 16px)` },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#F0F0F5",
                border: "1px solid #E7E9FF",
                borderRadius: "10px",
                p: 3,
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "27px",
                  letterSpacing: "-0.439px",
                  color: "#0A1628",
                }}
              >
                {title}
              </Typography>

              {cardType === "richtext" ? (
                <LexicalRichText
                  elements={richContent}
                  sx={{ p: { mb: 1 } }}
                  TypographyProps={{
                    sx: {
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "20px",
                      color: "#3E4159",
                    },
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    rowGap: 2,
                    columnGap: 2,
                  }}
                >
                  {items?.map((item) => (
                    <Box key={item.id ?? item.value}>
                      {item.fieldLabel ? (
                        <Typography
                          sx={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 700,
                            lineHeight: "16px",
                            letterSpacing: "0.6px",
                            textTransform: "capitalize",
                            color: "#3E4159",
                            mb: 0.75,
                          }}
                        >
                          {item.fieldLabel}
                        </Typography>
                      ) : null}
                      {item.isLink && item.href ? (
                        <Box
                          component={Link}
                          href={item.href}
                          sx={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "20px",
                            letterSpacing: "-0.15px",
                            color: "#1020E1",
                            textDecoration: "underline",
                            display: "block",
                          }}
                        >
                          {item.label}
                        </Box>
                      ) : (
                        <Typography
                          sx={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "20px",
                            letterSpacing: "-0.15px",
                            color: "#3E4159",
                          }}
                        >
                          {item.value}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default ContentOverview;
