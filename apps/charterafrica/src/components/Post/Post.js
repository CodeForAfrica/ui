import { RichTypography, Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";

const Post = React.forwardRef(function Post(props, ref) {
  const { author, date, image, title, sx } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Figure
        sx={{
          maxHeight: { xs: "324px", md: "487px" },
          overflow: "hidden",
          width: "100vw",
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
      <Section sx={{ px: { xs: 2.5, sm: 0 }, pt: 5 }}>
        <Grid container rowSpacing={2.5}>
          <Grid item xs={12}>
            <RichTypography
              color="neutral.dark"
              typography={{ md: "h3" }}
              variant="h3Small"
            >
              {title}
            </RichTypography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            rowSpacing={2.5}
          >
            <Grid
              item
              sm={6}
              md={4}
              container
              direction="column"
              rowSpacing={1.25}
            >
              <Grid item>
                <RichTypography variant="subheading">{author}</RichTypography>
              </Grid>
              <Grid item>
                <RichTypography variant="subheading">{date}</RichTypography>
              </Grid>
            </Grid>
            <Grid item sm="auto" />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Post;
