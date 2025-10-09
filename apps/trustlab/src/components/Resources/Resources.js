import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const Resources = forwardRef(function Resources(props, ref) {
  const { title, resources = [] } = props;

  return (
    <Box ref={ref} sx={{ background: "#CDCDCD" }}>
      <Section sx={{ py: 4, px: { xs: 2.5, md: 0 } }}>
        {title && (
          <Typography variant="display4" sx={{ mb: 4 }}>
            {title}
          </Typography>
        )}
        <Grid container spacing={4}>
          {resources.map((resource, idx) => (
            <Grid
              key={resource.title || `resource-${idx}`}
              size={{
                xs: 6,
                md: 3,
              }}
              display="flex"
              justifyContent="center"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                width="100%"
                component={resource?.link?.href ? Link : "div"}
                href={resource?.link?.href}
                sx={{
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 6,
                  }}
                >
                  <Figure
                    ImageProps={{
                      alt: resource.icon.alt,
                      src: resource.icon.src,
                    }}
                    sx={{
                      height: `${resource.icon?.height}px`,
                      width: `${resource.icon?.width}px`,
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ width: "100%" }}
                  mb={2}
                >
                  {/* Dot for sm and up */}
                  <Box
                    sx={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#000",
                    }}
                  />
                  <Divider
                    sx={{
                      height: "1px",
                      bgcolor: "#000",
                      flex: 1,
                      width: "100%",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    alignSelf: "flex-start",
                    textAlign: "left",
                    mb: 2,
                    textDecoration: "none",
                  }}
                  variant="subheading2"
                >
                  {resource.title}
                </Typography>
                <LexicalRichText
                  elements={resource.description}
                  sx={{
                    textAlign: "left",
                    alignSelf: "flex-start",
                  }}
                  TypographyProps={{
                    gutterBottom: true,
                    variant: "p2",
                    sx: {
                      textAlign: "left",
                      mb: 0,
                      textDecoration: "none",
                    },
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

export default Resources;
