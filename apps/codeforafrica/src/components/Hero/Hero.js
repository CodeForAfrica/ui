import { Section } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import React from "react";

import HeroImage from "./HeroImage";
import HeroText from "./HeroText";

import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const Hero = React.forwardRef(function Hero(props, ref) {
  const { image, slug, ...other } = props;

  return (
    <TwoToneBackground
      sx={{ py: { xs: "43px", sm: 0, md: "65px", lg: 0 } }}
      {...other}
      ref={ref}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 }, zIndex: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <HeroText {...other} />
          </Grid>
          <Grid item>
            <HeroImage {...image} />
          </Grid>
        </Grid>
      </Section>
    </TwoToneBackground>
  );
});

export default Hero;
