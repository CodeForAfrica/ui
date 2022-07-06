import { Section, RichTypography } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React from "react";

import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const Background = styled(TwoToneBackground, {
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  height: 300,
  alignItems: "center",
  "&:before": {
    // Override [0, md) down leaving [md, ∞) untouched.
    [theme.breakpoints.down("md")]: {
      background: theme.palette.background.main,
    },
  },
}));

const MemberFigureRoot = styled("figure")(({ theme }) => ({
  borderRadius: "50%",
  filter: "grayscale(100%)",
  margin: 0,
  height: "166px",
  width: "166px",
  [theme.breakpoints.up("md")]: {
    height: "250px",
    width: "250px",
  },
}));

const AboutChildPageHeader = React.forwardRef(function AboutChildPageHeader(
  props,
  ref
) {
  const { FigureProps, image: imageProp, name, sx, thumbnail, title } = props;

  if (!(name || thumbnail)) {
    return null;
  }
  const image = thumbnail || imageProp;
  const { sx: figureSxProp } = FigureProps || {};
  return (
    <Background ref={ref}>
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
          <Grid item order={{ xs: 0, md: 1 }}>
            <MemberFigureRoot
              {...FigureProps}
              sx={{
                background: `url(${image.src})`,
                backgroundBlendMode: "luminosity",
                backgroundSize: "cover",
                ...figureSxProp,
              }}
            />
          </Grid>
          <Grid item order={{ xs: 1, md: 0 }}>
            <RichTypography
              sx={{
                maxWidth: { md: 383 },
                paddingBottom: 2.5,
              }}
              variant="h1"
            >
              {name}
            </RichTypography>
            <RichTypography variant="h3Light">{title}</RichTypography>
          </Grid>
        </Grid>
      </Section>
    </Background>
  );
});

export default AboutChildPageHeader;
