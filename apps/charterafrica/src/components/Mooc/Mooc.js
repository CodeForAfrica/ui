import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { Button, Grid } from "@mui/material";
import React from "react";

import BackgroundBox from "@/charterafrica/components/BackgroundBox";
import RichText from "@/charterafrica/components/RichText";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  const { title, link, image, sx } = props;

  if (!title) {
    return null;
  }
  return (
    <BackgroundBox sx={sx} ref={ref}>
      <Section
        ref={ref}
        sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "86px" } }}
      >
        <Grid
          container
          rowSpacing={2.5}
          direction={{ xs: "column-reverse", md: "row" }}
          wrap="nowrap"
        >
          <Grid
            item
            xs={12}
            md={6}
            container
            direction="column"
            alignItems={{ xs: "flex-start", sm: "center", md: "flex-start" }}
            rowSpacing={5}
          >
            <Grid item>
              <RichText
                color="text.secondary"
                elements={title}
                textAlign={{ xs: "left", sm: "center", md: "left" }}
                typography={{ md: "h1" }}
                variant="h3Small"
                sx={() => ({
                  "& > em, & > strong": {
                    color: "secondary.main",
                    fontStyle: "normal",
                  },
                })}
              />
            </Grid>
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
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent={{
              xs: "center",
              md: "flex-end",
            }}
          >
            <Figure
              ImageProps={{
                ...image,
                style: {
                  objectFit: "cover",
                  ...image?.style,
                },
              }}
              sx={{
                border: 2,
                borderColor: "common.white",
                height: {
                  xs: "calc((100vw / 390) * 199.2)", // 199.2px at 390 scren-size
                  sm: 550,
                  md: 281,
                  lg: 329,
                },
                width: {
                  xs: "calc(100vw - 80px)", // 310px at 390 screen-size
                  sm: 688,
                  md: 436,
                  lg: 512,
                },
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </BackgroundBox>
  );
});

export default Mooc;
