import { Section, StayInTouch } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import React from "react";

const PartnersList = React.forwardRef(function PartnersList(props, ref) {
  const { partners, title } = props;

  if (!partners?.length) {
    return null;
  }
  return (
    <Section
      sx={(theme) => ({
        background: theme.palette.background.default,
        pb: 8,
      })}
      fixed={false}
      ref={ref}
    >
      <Box
        sx={(theme) => ({
          px: { xs: 2.5, sm: 0 },
          maxWidth: theme.contentWidths.values,
          m: "0 auto",
        })}
      >
        <Typography variant="subheading2">{title}</Typography>
        {partners.map((partner) => (
          <Grid
            container
            alignItems="flex-start"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 10 }}
            wrap="nowrap"
            key={partner.id}
            sx={{
              py: {
                xs: 5,
                sm: 2.5,
              },
              borderTop: "1px solid",
            }}
          >
            <Grid
              size={{ xs: 12, sm: 4 }}
              sx={{
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <Figure
                ImageProps={{
                  alt: partner.logo.alt || partner.name,
                  src: partner.logo.url,
                  style: { objectPosition: "left top" },
                }}
                sx={{
                  filter: "grayscale(100%)",
                  height: partner.logo.height || "auto",
                  width: "280px",
                  m: 0,
                  position: "relative",
                  "&:hover": {
                    filter: "none",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }} container direction="column">
              <Grid>
                <Typography
                  variant="h2"
                  sx={{
                    flexGrow: 1,
                    mb: 3.25,
                    mt: { xs: 3.25, sm: 0 },
                    textAlign: "left",
                    order: 0,
                  }}
                >
                  {partner.name}
                </Typography>
              </Grid>
              <Grid>
                <LexicalRichText
                  elements={partner.description}
                  sx={{ order: 1 }}
                  TypographyProps={{
                    sx: {
                      textAlign: "left",
                      color: "#252B37",
                    },
                    variant: "p2",
                  }}
                />
              </Grid>
              <Grid>
                <StayInTouch
                  links={partner.connect}
                  LinkProps={{ component: Link, sx: { mr: 2 } }}
                  TitleProps={{
                    sx: {
                      textTransform: "uppercase",
                      fontSize: "10px",
                      fontWeight: 700,
                    },
                  }}
                  sx={{ mt: { xs: 0, sm: 5 }, order: 2 }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Section>
  );
});

export default PartnersList;
