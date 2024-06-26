import { Section } from "@commons-ui/core";
import { Figure, Link, RichTypography } from "@commons-ui/next";
import { Box, Grid, Stack } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

import NewsletterSubscription from "@/roboshield/components/NewsletterSubscription";
import StayInTouch from "@/roboshield/components/StayInTouch";
import RichText from "@/roboshield/components/RichText";
import FooterDescription from "./FooterDescription";
import { Partner } from "@/roboshield/lib/data/payload.types";

export interface FooterProps {
  connect: {
    links: { url: string; platform: string }[];
    title: string;
  };
  description: string;
  logo: any;
  newsletter: {
    children: React.ReactNode;
    embedCode: string;
    sx: any;
    title: string;
  };
  initiative: {
    partners: Partner[];
    title: string;
    description: string;
  };
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

export default function Footer({
  connect,
  description,
  logo,
  newsletter,
  initiative,
}: FooterProps) {
  return (
    <FooterRoot component="footer">
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Grid container columns={24} justifyContent="space-between">
          <Grid
            item
            xs={24}
            md={15}
            lg={16}
            sx={{
              order: { xs: 1, md: 0 },
            }}
          >
            <Grid container columns={24} justifyContent="space-between">
              <Grid
                item
                xs={24}
                md="auto"
                container
                direction="column"
                sx={{
                  maxWidth: { xs: "none", md: "337px" },
                }}
              >
                <Grid item>
                  <FooterDescription
                    description={description}
                    logo={logo}
                    sx={{ mt: { xs: 10, md: 0 } }}
                  />
                </Grid>
                <Grid item>
                  <StayInTouch {...connect} sx={{ mt: "52px" }} />
                </Grid>
              </Grid>
              <Grid item xs={24} md={11}>
                <Stack
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ height: "113px", mt: { xs: "52px", md: 0 } }}
                >
                  <RichTypography
                    variant="h6"
                    sx={{ color: "text.secondary", mb: "0" }}
                  >
                    {initiative?.title}
                  </RichTypography>
                  <RichText />
                  <Stack alignItems="center" direction="row" spacing={0.5}>
                    {initiative?.partners?.map((partner: any) => (
                      <Link
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                      >
                        <Figure
                          ImageProps={{
                            src: partner?.logo?.src,
                            alt: partner?.logo?.alt,
                          }}
                          sx={{
                            display: "flex",
                            filter: "grayscale(100%)",
                            height: "55px",
                            width: "140px",
                            "&:hover": {
                              filter: "grayscale(0%)",
                            },
                          }}
                        />
                      </Link>
                    ))}
                  </Stack>
                </Stack>
                <RichText
                  variant="footer"
                  typographyProps={{
                    sx: {
                      mt: {
                        md: 6.5,
                      },
                    },
                    LinkProps: {
                      color: "text.secondary",
                      sx: { textDecorationColor: "text.secondary" },
                    },
                  }}
                  sx={(theme: Theme) => ({
                    a: {
                      color: theme.palette.text.secondary,
                      textDecorationColor: theme.palette.text.secondary,
                    },
                    mt: "52px",
                    textAlign: { xs: "center", md: "left" },
                    typography: "footer",
                  })}
                  elements={initiative?.description}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={24} md="auto" sx={{ order: { xs: 0, md: 1 } }}>
            <NewsletterSubscription {...newsletter} />
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
}
