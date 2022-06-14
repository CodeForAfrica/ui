import { Section, RichTypography } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React from "react";

import TwoToneBackground from "../TwoToneBackground";

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

const AboutMemberPageHeader = React.forwardRef(function AboutMemberPageHeader(
  props,
  ref
) {
  const { name, title, thumbnail } = props;

  if (!(name || thumbnail)) {
    return null;
  }
  return (
    <TwoToneBackground ref={ref}>
      <Section
        sx={{
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: "25px" },
          zIndex: 1,
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
              sx={{
                background: `url(${thumbnail.src})`,
                backgroundBlendMode: "luminosity",
                backgroundSize: "cover",
              }}
            />
          </Grid>
          <Grid item order={{ xs: 1, md: 0 }}>
            <RichTypography
              sx={{
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
    </TwoToneBackground>
  );
});

export default AboutMemberPageHeader;
