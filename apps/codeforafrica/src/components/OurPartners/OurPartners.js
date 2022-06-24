import { Section, RichTypography } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React from "react";

import Figure from "@/codeforafrica/components/Figure";

const Title = styled(RichTypography)(({ theme }) => ({
  "& .highlight": {
    color: theme.palette.primary.main,
  },
}));

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
            <Figure
              alt={name}
              layout="fill"
              {...logo}
              sx={{
                filter: "grayscale(100%) opacity(50%)",
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
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
});

export default OurPartners;
