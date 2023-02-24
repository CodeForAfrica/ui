import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import React from "react";

import RichText from "@/charterafrica/components/RichText";

const Impressum = React.forwardRef(function Impressum(props, ref) {
  const { content, sx } = props;

  if (!content) {
    return null;
  }
  return (
    <Box bgcolor="secondary.light" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <Grid container>
          <Grid item xs={12} order={{ xs: 0, md: 1 }} />
          <Grid item xs={12} order={{ xs: 1, md: 0 }}>
            <Box
              color="neutral.dark"
              sx={(theme) => ({
                "& h1": {
                  ...theme.typography.h1Small,
                  mb: 3.75,
                  [theme.breakpoints.up("md")]: {
                    ...theme.typography.h1,
                  },
                },
                "& h2": {
                  mb: 2.5,
                  ...theme.typography.h2Small,
                  [theme.breakpoints.up("md")]: {
                    ...theme.typography.h2,
                  },
                },
                "& p": {
                  ...theme.typography.p1,
                  mb: 2,
                  [theme.breakpoints.up("md")]: {
                    ...theme.typography.subheading,
                  },
                },
                "& p:last-of-type": {
                  mb: 0,
                },
              })}
            >
              <RichText color="neutral.dark" elements={content} />
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Impressum;
