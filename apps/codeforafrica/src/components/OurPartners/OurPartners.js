import { Section, RichTypography } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const Title = styled(RichTypography)(({ theme }) => ({
  "& .highlight": {
    color: theme.palette.primary.main,
  },
}));

const PartnerLogo = styled(Image)({
  filter: "grayscale(100%) opacity(50%)",
});

const OurPartners = React.forwardRef(function OurPartners(props, ref) {
  const { partners, slug, title, ...other } = props;

  if (!partners?.length) {
    return null;
  }
  return (
    <Section
      sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, sm: 10 } }}
      {...other}
      ref={ref}
    >
      <Title variant="h4" textAlign="center" sx={{ mb: { xs: 5, sm: 10 } }}>
        {title}
      </Title>
      <Grid container columns={10} justifyContent="flex-start">
        {partners?.map(({ name, logo }) => (
          <Grid key={name} item xs={5} sm={2}>
            <Box
              component="figure"
              sx={{
                height: {
                  xs: "75.14px",
                  sm: "73.54px",
                  md: "90.67px",
                  lg: "114.64px",
                },
                m: 0,
                position: "relative",
                width: {
                  xs: "131.49px",
                  sm: "128.7px",
                  md: "158.67px",
                  lg: "200.63px",
                },
              }}
            >
              <PartnerLogo alt={name} layout="fill" {...logo} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
});

export default OurPartners;
