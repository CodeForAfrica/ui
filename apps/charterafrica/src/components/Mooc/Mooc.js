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
    <Box
      bgcolor={neutral[900]}
      ref={ref}
      sx={{
        backgroundImage: {
          md: `url(/images/mooc-background.png)`,
        },
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        ...sx,
      }}
    >
      <Section
        ref={ref}
        sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "86px" } }}
      >
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", md: "row" }}
          wrap="nowrap"
        >
          <Grid item xs={12} sm={6} container>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={{
                xs: "center",
                md: "flex-start",
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
                color="secondary"
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
            justifyContent={{
              xs: "center",
              md: "flex-end",
            }}
          >
            <Figure
              ImageProps={{
                ...image,
                objectFit: "cover",
              }}
              sx={{
                width: {
                  xs: 310,
                  sm: 688,
                  md: 436,
                  lg: 512,
                },
                height: {
                  xs: 199.2,
                  sm: 550,
                  md: 281,
                  lg: 329,
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
