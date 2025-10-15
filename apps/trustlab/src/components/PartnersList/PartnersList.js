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
            key={partner.id}
            sx={{
              display: "flex",
              alignItems: { xs: "center", sm: "flex-start" },
              py: 5,
              flexDirection: { xs: "column", sm: "row" },
              borderTop: "1px solid",
              gap: { xs: 2, sm: 10 },
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              xs={12}
              sm={4}
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
                  mt: { xs: 3.25, sm: 0 },
                  textAlign: { xs: "center", sm: "left" },
                  order: { xs: 1, sm: 0 },
                }}
              >
                {partner.name}
              </Typography>
              <LexicalRichText
                elements={partner.description}
                sx={{ order: { xs: 0, md: 1 } }}
                TypographyProps={{
                  sx: { textAlign: { xs: "center", sm: "left" } },
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
                sx={{ mt: { xs: 0, sm: 5 }, order: 2 }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Section>
  );
});

export default PartnersList;
