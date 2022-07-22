import { Section, RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Grid from "@mui/material/Grid";
import React from "react";

import Figure from "@/codeforafrica/components/Figure";

const OurPartners = React.forwardRef(function OurPartners(props, ref) {
  const { partners: { title, list: partners } = {}, sx } = props;

  if (!partners?.length) {
    return null;
  }
  return (
    <Section
      sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, sm: 10 }, ...sx }}
      ref={ref}
    >
      <RichTypography
        variant="h4"
        textAlign="center"
        sx={{ mb: { xs: 5, sm: 10 }, "& a": { textDecoration: "none" } }}
      >
        {title}
      </RichTypography>
      <Grid container columns={10} justifyContent="flex-start">
        {partners.map(({ logo, name, slug }) => {
          const href = slug ? `/about/partners/${slug}` : undefined;
          const Wrapper = href?.length ? Link : React.Fragment;
          const wrapperProps = href ? { href } : undefined;
          return (
            <Grid item xs={5} sm={2} key={name}>
              <Wrapper {...wrapperProps}>
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
                    "&:hover": {
                      ...(href && { filter: "none" }),
                    },
                  }}
                />
              </Wrapper>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
});

export default OurPartners;
