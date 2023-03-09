import { RichTypography, Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { Button, Box, Grid } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";

const Opportunity = React.forwardRef(function Opportunity(props, ref) {
  const { apply, date, image, title, sx } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, pt: 5 }}>
        <Grid container rowSpacing={2.5}>
          <Grid
            item
            xs={12}
            md={4}
            order={{ xs: 0, md: 1 }}
            container
            justifyContent={{ md: "flex-end" }}
          >
            <Grid item xs={12}>
              <Figure
                sx={{
                  maxHeight: { xs: "355px", md: "260px" },
                  overflow: "hidden",
                  width: "100%",
                }}
                ImageProps={{
                  alt: image.alt,
                  fill: false,
                  height: 0,
                  priority: true,
                  src: image.url,
                  style: {
                    height: "auto",
                    objectFit: "cover",
                    width: "100%",
                  },
                  width: 0,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            order={{ xs: 1, md: 0 }}
            container
            rowSpacing={5}
          >
            <Grid item xs={12} container direction="column" rowSpacing={2.5}>
              <Grid item>
                <RichTypography
                  color="neutral.dark"
                  typography={{ md: "h3" }}
                  variant="h3Small"
                >
                  {title}
                </RichTypography>
              </Grid>
              <Grid item>
                <RichTypography variant="subheading">{date}</RichTypography>
              </Grid>
              {apply?.href ? (
                <Grid item>
                  <Button
                    color="primary"
                    component={Link}
                    href={apply.href}
                    variant="contained"
                  >
                    {apply.label}
                  </Button>
                </Grid>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {/* Share This Page */}
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Opportunity;
