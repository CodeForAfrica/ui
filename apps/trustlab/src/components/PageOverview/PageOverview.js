import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const PageOverview = forwardRef(function PageOverview(
  { title, description, image },
  ref,
) {
  if (!title || !description || !image?.url) {
    return null;
  }
  const { url, alt } = image;
  return (
    <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }} ref={ref}>
      <Grid
        container
        alignItems="center"
        flexWrap="nowrap"
        gap={{ xs: 6, md: 0 }}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Grid item>
          <Typography
            variant="h1"
            sx={{ borderBottom: "1px solid", mb: 3, pb: 1 }}
          >
            {title}
          </Typography>
          <LexicalRichText
            elements={description}
            TypographyProps={{
              sx: { mb: 2 },
            }}
          />
        </Grid>
        <Grid
          item
          sx={{ width: { xs: "100%", md: "283.53px" }, minWidth: "283.53px" }}
        >
          <Figure
            ImageProps={{
              alt,
              src: url,
            }}
            sx={{
              height: { xs: "374.47px", md: "158px" },
              m: 0,
              position: "relative",
              width: { xs: "100%", md: "283.53px" },
            }}
          />
        </Grid>
      </Grid>
    </Section>
  );
});

export default PageOverview;
