import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  const { title, link, image, sx } = props;

  if (!title) {
    return null;
  }

  return (
    <Box bgcolor={neutral[900]} ref={ref} sx={sx}>
      <Section
        ref={ref}
        sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "86px" } }}
      >
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", sm: "row" }}
          wrap="nowrap"
        >
          <Grid item xs={12} sm={6} container>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={{
                xs: "center",
                sm: "flex-start",
              }}
              sx={{
                gap: 5,
                width: "100%",
              }}
            >
              <RichText
                component="h1"
                elements={title}
                textAlign="left"
                typography={{ md: "h1", sm: "h2" }}
                variant="h4"
                sx={() => ({
                  color: "secondary",
                  "&>em": {
                    color: "secondary.main",
                    fontStyle: "normal",
                  },
                })}
              />

              <Button
                color={link.color}
                size="medium"
                variant="contained"
                sx={{ width: "fit-content" }}
              >
                {link?.label}
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              overflow: "hidden",
            }}
            container
            justifyContent="flex-end"
          >
            <Figure
              ImageProps={{
                ...image,
                alt: title.content,
                objectFit: "cover",
              }}
              sx={{
                height: {
                  xs: 550,
                  sm: 281,
                  md: 329,
                },
                width: {
                  xs: 688,
                  sm: 436,
                  md: 512,
                },
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Mooc;
