import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid, Box, Button, SvgIcon } from "@mui/material";
import React, { forwardRef } from "react";

import VisitIcon from "@/trustlab/assets/icons/Type=visit, Size=20, Color=CurrentColor.svg";

const Incubator = forwardRef((props, ref) => {
  const {
    backgroundColor = "common.white",
    textColor = "text.primary",
    buttonLink,
    image,
    content,
  } = props;

  if (!content && !image) {
    return null;
  }

  const { url, alt } = image;
  return (
    <Box
      sx={{
        backgroundColor,
      }}
      ref={ref}
    >
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <LexicalRichText
              elements={content}
              sx={{
                h1: {
                  mb: 3,
                  pb: 1,
                },
                p: {
                  mb: 1,
                },
                h3: {
                  mb: 1,
                },
              }}
              TypographyProps={{
                gutterBottom: true,
                sx: {
                  mb: 1,
                  color: textColor,
                },
              }}
            />
            {buttonLink?.href && (
              <Button
                variant="contained"
                color="primary"
                href={buttonLink?.href}
                component={buttonLink?.href ? Link : undefined}
                sx={{
                  mt: 1,
                  borderRadius: 1,
                  border: "none",
                  textTransform: "none",
                }}
                size="large"
              >
                <SvgIcon sx={{ height: 20, width: 20 }} component={VisitIcon} />
                {buttonLink?.label || "Learn More"}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Figure
              ImageProps={{
                alt,
                src: url,
              }}
              sx={{
                height: { xs: "374.47px", md: "420px" },
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

export default Incubator;
