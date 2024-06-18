import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import FooterDescription from "./FooterDescription";

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
        <Grid
          container
          columns={24}
          justifyContent="space-between"
          gap={{
            xs: 3,
            md: 0,
          }}
        >
          <Grid
            item
            xs={24}
            md={8}
            sx={{
              order: { xs: 2, md: 0 },
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
          <Grid item xs={24} md={8} sx={{ order: { xs: 0, md: 1 } }}>
            <Grid
              container
              direction="column"
              gap={3}
              sx={{
                height: "100%",
              }}
            >
              <Typography sx={{ color: "text.secondary" }} variant="h6">
                In partnership with:
              </Typography>
              <Grid
                container
                spacing={2}
                wrap="wrap"
                alignItems="center"
                gap={2}
                sx={{
                  "&.MuiGrid-root .MuiGrid-item": {
                    p: 0,
                  },
                }}
              >
                {partners.map((partner: any) => (
                  <Grid
                    item
                    key={partner.name}
                    sx={{
                      p: 0,
                    }}
                  >
                    <Link href={partner.url} target="_blank">
                      <Figure
                        ImageProps={partner.logo}
                        sx={{
                          display: {
                            sm: "block",
                          },
                          filter: "grayscale(100%)",
                          height: "113px",
                          width: "170px",
                        }}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={24} md={8} sx={{ order: { xs: 1, md: 2 } }}>
            <Grid container justifyContent="flex-end">
              <Typography>
                This project was insipred by a{" "}
                <Link
                  href="https://reutersinstitute.politics.ox.ac.uk/how-many-news-websites-block-ai-crawlers"
                  target="blank"
                >
                  survey conducted{" "}
                </Link>
                by the Reutures Instititue in the Minority World
              </Typography>
              <Typography>
                The Audit data used in this project was based on{" "}
                <Link href="https://civicsignal.africa" target="blank">
                  Civic Signals{" "}
                </Link>
                MediaData DB
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
}
