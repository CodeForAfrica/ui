import { Section, StayInTouch } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid, Typography } from "@mui/material";
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
        py: 8,
      })}
      ref={ref}
    >
      <Box
        sx={(theme) => ({
          px: { xs: 2.5, sm: 0 },
          maxWidth: theme.contentWidths.values,
          m: "0 auto",
        })}
      >
        <Typography variant="h2">{title}</Typography>
        {partners.map((partner) => (
          <Grid
            container
            key={partner.id}
            sx={{
              display: "flex",
              alignItems: { xs: "center", md: "flex-start" },
              py: 5,
              flexDirection: { xs: "column", md: "row" },
              borderTop: "1px solid",
              px: 12.5,
              gap: { xs: 2, md: 10 },
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: "center", alignSelf: "center" }}
            >
              <Figure
                ImageProps={{
                  alt: partner.logo.alt || partner.name,
                  src: partner.logo.url,
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
            <Grid item xs={12} md={8} display="flex" flexDirection="column">
              <Typography
                variant="h2"
                sx={{
                  flexGrow: 1,
                  mb: 3.25,
                  mt: { xs: 3.25, md: 0 },
                  textAlign: { xs: "center", md: "left" },
                  order: { xs: 1, md: 0 },
                }}
              >
                {partner.name}
              </Typography>
              <LexicalRichText
                elements={partner.description}
                sx={{ order: { xs: 0, md: 1 } }}
                TypographyProps={{
                  sx: { textAlign: { xs: "center", md: "left" } },
                  variant: "p2",
                }}
              />
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
                sx={{ mt: 5 }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Section>
  );
});

export default PartnersList;
