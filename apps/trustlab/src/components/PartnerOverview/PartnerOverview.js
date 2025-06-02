import { Section } from "@commons-ui/core";
import { Figure, Link, RichTypography } from "@commons-ui/next";
import { Button, Grid, Box } from "@mui/material";
import React from "react";

const PartnerOverview = React.forwardRef(function PartnerOverview(props, ref) {
  const { sx, partners, title, action } = props;

  if (!partners?.length) {
    return null;
  }
  return (
    <Section
      sx={(theme) => ({
        background: theme.palette.grey.light,
        maxWidth: { xs: "100%" },
      })}
    >
      <Box
        sx={(theme) => ({
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, md: 7, lg: 10 },
          maxWidth: theme.contentWidths.values,
          m: "0 auto",
          ...sx,
        })}
        ref={ref}
      >
        <RichTypography
          variant="h4"
          textAlign="center"
          sx={{ "& a": { textDecoration: "none" }, mb: 4 }}
        >
          {title}
        </RichTypography>
        <Grid
          flexWrap
          container
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
          justifyContent="center"
          alignItems="center"
        >
          {partners.map(({ logo, id, link: { href } }) => {
            const { alt } = logo;
            const Wrapper = href?.length ? Link : React.Fragment;
            const wrapperProps = href?.length ? { href } : undefined;

            return (
              <Grid
                item
                xs={5}
                sm={2}
                justifyContent="center"
                key={id}
                spacing={2}
                sx={{
                  width: {
                    xs: "100%",
                  },
                }}
              >
                <Wrapper {...wrapperProps}>
                  <Figure
                    ImageProps={{
                      alt,
                      src: logo.url,
                    }}
                    sx={{
                      filter: "grayscale(100%)",
                      height: "100px",
                      m: 0,
                      position: "relative",
                      width: "auto",
                      "&:hover": {
                        filter: "none",
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
      </Box>
    </Section>
  );
});

export default PartnerOverview;
