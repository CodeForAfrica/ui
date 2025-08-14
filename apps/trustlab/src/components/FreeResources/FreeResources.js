import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Box,
  Divider,
  Grid2 as Grid,
  Typography,
  SvgIcon,
} from "@mui/material";
import React, { forwardRef } from "react";

import ArrowUpRightIcon from "@/trustlab/assets/icons/Type=arrowUpRight, Size=20, Color=CurrentColor.svg";

const FreeResources = forwardRef(function FreeResources(props, ref) {
  const { title, resources = [] } = props;

  return (
    <Box ref={ref} sx={{ background: "#CDCDCD" }}>
      <Section sx={{ py: 4, px: { xs: 2.5, md: 0 } }}>
        {title && (
          <Typography variant="h1" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        <Grid container spacing={4}>
          {resources.map((resource, idx) => (
            <Grid
              item
              key={resource.title || `resource-${idx}`}
              size={{
                xs: 6,
                md: 12 / resources.length,
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
                    mb: 2,
                    width: 64,
                    height: 64,
                  }}
                >
                  <Figure
                    ImageProps={{
                      alt: resource.icon.alt,
                      src: resource.icon.src,
                    }}
                    sx={{
                      height: { xs: "108px", md: "180px" },
                      width: { xs: "108px", md: "180px" },
                    }}
                  />
                </Box>
                <Box
                  display={{ xs: "none", sm: "flex" }}
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
                    "&:after": {
                      content: "''",
                      display: { xs: "block", sm: "none" },
                      height: "1px",
                      bgcolor: "#000",
                      width: "18px",
                      mt: 1.25,
                    },
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
                {resource.link?.label && (
                  <Box
                    alignSelf="flex-start"
                    display={{ xs: "flex", sm: "none" }}
                    alignItems="center"
                    sx={{ mt: 2, textDecoration: "none" }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textDecoration: "none",
                        cursor: "pointer",
                        alignSelf: "flex-start",
                        color: "#1020E1",
                        fontWeight: "bold",
                      }}
                    >
                      {resource.link.label}
                    </Typography>
                    <SvgIcon
                      sx={{
                        color: "#1020E1",
                      }}
                      component={ArrowUpRightIcon}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

export default FreeResources;
