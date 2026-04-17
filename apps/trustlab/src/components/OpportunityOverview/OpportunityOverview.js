import { Section } from "@commons-ui/core";
import { Figure, RichTypography } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { forwardRef } from "react";

const OpportunityOverview = forwardRef(
  function OpportunityOverview(props, ref) {
    const {
      backgroundColor = "common.white",
      textColor = "text.primary",
      content,
      date,
      image,
      location,
      metrics,
      title,
    } = props;

    if (!content || !image) {
      return null;
    }
    const { url, alt } = image;
    // Seems like location and date are optional & we're introducing title as optional.
    const hasLocationDate = location?.length && date?.length;
    return (
      <Box sx={{ backgroundColor }} ref={ref}>
        <Section sx={{ py: 5, px: { xs: 2.5, sm: 0 } }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid
              size={{ xs: 12, sm: 6 }}
              container
              spacing={1}
              direction="column"
            >
              {title ? (
                <Grid>
                  <RichTypography variant="h2" fontSize={26} lineHeight="29px">
                    {title}
                  </RichTypography>
                </Grid>
              ) : null}
              {hasLocationDate ? (
                <Grid>
                  <RichTypography component="span" variant="p2">
                    {location} |{" "}
                  </RichTypography>
                  <RichTypography
                    component="span"
                    variant="p2"
                    sx={{ color: "#828499" }}
                  >
                    {date}
                  </RichTypography>
                </Grid>
              ) : null}
              <Grid>
                <LexicalRichText
                  elements={content}
                  sx={{
                    h1: { mb: 1, fontWeight: 700, fontSize: "24px" },
                    h2: { mb: 1, fontWeight: 700, fontSize: "20px" },
                    h3: { mb: 1, fontWeight: 700, fontSize: "18px" },
                    p: { mb: 1 },
                  }}
                  TypographyProps={{
                    gutterBottom: true,
                    variant: "p2",
                    sx: {
                      mb: 2,
                      color: textColor,
                    },
                  }}
                />
              </Grid>
              {metrics?.length > 0 ? (
                <Grid>
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
                </Grid>
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
                  height: { xs: "374px", md: image?.height },
                  minHeight: "270px",
                  maxHeight: "420px",
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
