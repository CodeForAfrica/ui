import { RichTypography, Section } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import React from "react";

import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const ErrorHero = React.forwardRef(function ErrorHero(props, ref) {
  const { title, subtitle, sx, tags, ...other } = props;

  return (
    <TwoToneBackground
      sx={{ py: { xs: "43px", sm: 0, md: "65px", lg: 0 } }}
      {...other}
      ref={ref}
    >
      <Section
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, md: "25px" },
          zIndex: 1,
          ...sx,
        }}
      >
        <Grid
          container
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ md: "center" }}
          rowSpacing={2.5}
          justifyContent={{ md: "space-between" }}
        >
          <Grid item order={{ xs: 1, md: 0 }}>
            <RichTypography
              sx={{
                paddingBottom: 2.5,
                fontSize: "48px",
              }}
              variant="h1"
            >
              {title}
            </RichTypography>
            <RichTypography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.75rem",
                  md: "2rem",
                  lg: "2.25rem",
                },
              }}
            >
              {subtitle}
            </RichTypography>
          </Grid>
        </Grid>
      </Section>
    </TwoToneBackground>
  );
});

export default ErrorHero;
