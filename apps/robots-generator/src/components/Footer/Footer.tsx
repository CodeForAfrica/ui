import { Section } from "@commons-ui/core";
import { Box, Grid, Typography } from "@mui/material";
import FooterDescription from "./FooterDescription";
import { styled } from "@mui/material/styles";
import { Figure, Link } from "@commons-ui/next";

interface FooterProps {
  logo: any;
  partners: any[];
  description: string;
}

const FooterRoot = styled(Box)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    backgroundColor: palette.common.black,
    color: palette.text.secondary,
    padding: `${typography.pxToRem(80)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(110)} 0`,
    },
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(100)} 0`,
    },
  }),
);

export default function Footer({ logo, description, partners }: FooterProps) {
  return (
    <FooterRoot component="footer">
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Grid container columns={24} justifyContent="space-between">
          <Grid
            item
            xs={24}
            md={9}
            sx={{
              order: { xs: 1, md: 0 },
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid
                item
                xs={12}
                md="auto"
                container
                direction="column"
                sx={{
                  maxWidth: { xs: "none", md: "337px" },
                }}
                gap={2}
              >
                <Grid item>
                  <FooterDescription
                    description={description}
                    logo={logo}
                    sx={{ mt: { xs: 10, md: 0 } }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={24} md={15} sx={{ order: { xs: 0, md: 1 } }}>
            <Grid
              container
              direction="column"
              gap={2}
              sx={{
                height: "100%",
              }}
              justifyContent="center"
            >
              <Typography sx={{ color: "text.secondary" }} variant="h6">
                In partnership with:
              </Typography>
              <Grid
                container
                spacing={2}
                wrap="nowrap"
                alignItems="center"
                gap={2}
              >
                {partners.map((partner: any) => (
                  <Grid item key={partner.name}>
                    <Link href={partner.url} target="_blank">
                      <Figure
                        ImageProps={partner.logo}
                        sx={{
                          display: {
                            sm: "block",
                          },
                          filter: "grayscale(100%)",
                          height: { xs: "113px", md: "113px", lg: "113px" },
                          width: { xs: "251px", md: "251px", lg: "251px" },
                        }}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
}
