import { Section } from "@commons-ui/core";
import { Figure, Link, RichTypography } from "@commons-ui/next";
import { Button, Grid, Box } from "@mui/material";
import React from "react";

const OurPartners = React.forwardRef(function OurPartners(props, ref) {
  const { sx, partners, title, action } = props;

  if (!partners?.length) {
    return null;
  }
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.grey.light,
      })}
    >
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: 7, lg: 10 }, ...sx }}
        ref={ref}
      >
        <RichTypography
          variant="h4"
          textAlign="center"
          sx={{ "& a": { textDecoration: "none" } }}
        >
          {title}
        </RichTypography>
        <Grid container columns={10} justifyContent="center">
          {partners.map(({ logo, id, link: { href } }) => {
            const { alt } = logo;
            const Wrapper = href?.length ? Link : React.Fragment;
            const wrapperProps = href?.length ? { href } : undefined;

            return (
              <Grid
                container
                item
                xs={5}
                sm={2}
                justifyContent="center"
                key={id}
              >
                <Wrapper {...wrapperProps}>
                  <Figure
                    ImageProps={{
                      alt,
                      src: logo.url,
                    }}
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
        {action?.href && (
          <Button
            variant="contained"
            component={Link}
            href={action?.href}
            sx={{
              display: "block",
              mt: 7.25,
              mx: "auto",
              textAlign: "center",
              width: { xs: "100%", sm: "fit-content" },
            }}
          >
            {action?.content || action?.href}
          </Button>
        )}
      </Section>
    </Box>
  );
});

export default OurPartners;
