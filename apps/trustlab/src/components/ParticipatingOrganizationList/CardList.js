import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Button, Card, Grid2 as Grid, Typography } from "@mui/material";
import { forwardRef } from "react";

const CardList = forwardRef(function CardList(props, ref) {
  const { title, subtitle, organizations = [], sx, ...other } = props;

  if (!organizations.length) {
    return null;
  }

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 6, md: 8 },
        color: "#0A1628",
        ...sx,
      }}
      data-testid="card-list"
      {...other}
    >
      <Section sx={{ px: { xs: 2.5, md: 0 } }}>
        {title && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: subtitle ? 1 : 0,
              }}
            >
              {title}
            </Typography>
            {subtitle && <Typography variant="p2">{subtitle}</Typography>}
          </Box>
        )}
        <Grid container spacing={3} rowSpacing={3.75}>
          {organizations.map((org, index) => {
            const hasLink = Boolean(org.link?.href);

            return (
              <Grid key={org.id ?? index} size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    backgroundColor: "common.white",
                    borderRadius: "10px",
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    {org.image ? (
                      <Figure
                        ImageProps={{
                          alt: org.image.alt || org.name,
                          src: org.image.src,
                          sx: {
                            objectFit: "contain",
                          },
                        }}
                        sx={{
                          width: 56,
                          height: 56,
                          minWidth: 56,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          minWidth: 56,
                          borderRadius: "50%",
                          backgroundColor: "#4A4A68",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      />
                    )}
                    <Typography
                      variant="p2"
                      sx={{
                        fontWeight: 700,
                        color: "#252B37",
                      }}
                    >
                      {org.name}
                    </Typography>
                  </Box>
                  {org.description && (
                    <LexicalRichText
                      elements={org.description}
                      sx={{
                        flex: 1,
                        mb: hasLink ? 2 : 0,
                        color: "#252B37",
                      }}
                      TypographyProps={{
                        variant: "p2",
                        color: "#252B37",
                      }}
                    />
                  )}
                  {hasLink && (
                    <Box>
                      <Button
                        component={Link}
                        href={org.link.href}
                        size="small"
                        sx={{
                          backgroundColor: "#FDD835",
                          border: "2px solid #000000",
                          color: "#000",
                          fontWeight: 500,
                          textTransform: "none",
                          height: 44,
                          borderRadius: "6px",
                          px: 2,
                          "&:hover": {
                            backgroundColor: "#FBC02D",
                          },
                        }}
                      >
                        {org.buttonLabel || "Learn More"}
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Section>
    </Box>
  );
});

export default CardList;
