import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import Grid from "@mui/material/Grid";
import React from "react";

import HeroText from "./HeroText";

import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const Hero = React.forwardRef(function Hero(props, ref) {
  const { image, slug, sx, ...other } = props;

  return (
    <TwoToneBackground
      sx={{ py: { xs: "43px", sm: 0, md: "65px", lg: 0 }, ...sx }}
      ref={ref}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 }, zIndex: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <HeroText {...other} />
          </Grid>
          <Grid item>
            <Figure
              ImageProps={{
                alt: "Civic tech and open data labs",
                priority: true,
                ...image,
              }}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                height: { sm: "258px", md: "370px", lg: "498px" },
                width: { sm: "258px", md: "370px", lg: "498px" },
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </TwoToneBackground>
  );
});

export default Hero;
