import { Figure, Link } from "@commons-ui/next";
import { Box, Button, Grid } from "@mui/material";
import React from "react";

import BackgroundBox from "@/charterafrica/components/BackgroundBox";
import RichText from "@/charterafrica/components/RichText";

const ImagePageHeader = React.forwardRef(function ImagePageHeader(props, ref) {
  const { description, media, link, title, sx } = props;

  if (!title) {
    return null;
  }
  return (
    <BackgroundBox py={{ xs: 0, md: 5 }} sx={sx} ref={ref}>
      <Box
        maxWidth={{ md: "972px" }}
        mx="auto"
        px={{ xs: 2.5, sm: 0 }}
        py={{ xs: 8, md: 0 }}
      >
        <Grid
          container
          columnSpacing={10}
          rowSpacing={5}
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          wrap="nowrap"
        >
          <Grid
            item
            xs={12}
            md="auto"
            order={{ xs: 0, md: media.align === "end" ? 1 : 0 }}
          >
            <Figure
              sx={{
                maxHeight: { xs: "317px", sm: "335px", md: "345px" },
                maxWidth: { xs: "100%", md: "468px" },
                overflow: "hidden",
                objectFit: {
                  xs: "fill",
                  md: "cover",
                },
                objectPosition: {
                  xs: "center",
                  md: "top left",
                },
              }}
              ImageProps={{
                alt: media.image.alt || title,
                fill: false,
                height: 0,
                priority: true,
                src: media.image.url,
                style: {
                  height: "auto",
                  objectFit: "inherit",
                  objectPosition: "inherit",
                  width: "100%",
                },
                width: 0,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 1, md: media.align === "end" ? 0 : 1 }}
            container
            direction="column"
            alignItems={{ xs: "center", md: "flex-start" }}
            columnSpacing={{ xs: 5 }}
            rowSpacing={{ xs: 5 }}
          >
            <Grid item>
              <RichText
                color="text.secondary"
                component="h1"
                elements={title}
                textAlign={{ xs: "center", md: "left" }}
                typography={{ md: "h1" }}
                variant="h1Small"
                sx={() => ({
                  "& h1 > em, & h1 > strong": {
                    color: "secondary.main",
                    fontStyle: "normal",
                  },
                })}
              />
            </Grid>
            {description?.length > 0 ? (
              <Grid item>
                <RichText
                  color="text.secondary"
                  elements={description}
                  variant="p1"
                />
              </Grid>
            ) : null}
            {link?.label ? (
              <Grid item>
                <Button
                  color="secondary"
                  component={link.href ? Link : undefined}
                  href={link.href}
                  size="medium"
                  variant="contained"
                  sx={{ width: "fit-content" }}
                >
                  {link.label}
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </BackgroundBox>
  );
});

export default ImagePageHeader;
