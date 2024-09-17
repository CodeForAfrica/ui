"use client";

import { RichTypography, Section, StayInTouch } from "@commons-ui/core";
import { StyledLink as Link } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";

import NavBarNavList from "@/engineeringblog/components/NavBarNavList";
import type { ConnectProps } from "@/engineeringblog/lib/data";
import type { Menu } from "@/engineeringblog/components/NavBarNavList";

interface FooterProps {
  copyright?: string;
  connect: ConnectProps;
  secondaryMenus?: Menu[];
  sx?: SxProps<Theme>;
}

const FooterRoot = styled("footer")(
  ({ theme: { breakpoints, palette, typography } }) => ({
    backgroundColor: palette.background.default,
    borderTop: `1px solid ${palette.text.primary}`,
    color: palette.text.primary,
    mt: 2.5,
    [breakpoints.up("md")]: {
      mt: 5,
    },
  }),
);

const Footer = React.forwardRef(function Footer(
  props: FooterProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { copyright, connect, secondaryMenus, sx } = props;
  return (
    <FooterRoot sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5 } }}>
        <Grid container justifyContent="space-between">
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm="auto" order={{ xs: 1, sm: 0 }}>
              <RichTypography
                textAlign={{ xs: "center", sm: "left" }}
                pt={{ xs: 1, sm: 0 }}
              >
                {copyright}
              </RichTypography>
            </Grid>
            <Grid
              item
              xs={12}
              sm="auto"
              order={{ xs: 0, sm: 1 }}
              container
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Grid item xs={12} sm="auto">
                <Box component="nav">
                  <NavBarNavList
                    NavListItemLinkProps={{
                      flexBasis: "auto",
                      variant: "body1",
                      sx: {
                        mr: { xs: 0, sm: 1.5, md: 2.5 },
                        typography: { md: "body1" },
                      },
                    }}
                    NavListItemProps={{
                      sx: {
                        borderBottom: { xs: "none" },
                        py: { xs: 1, sm: 0 },
                        mr: { xs: 0, sm: 1.5, md: 2.5 },
                        "&:first-of-type": {
                          pt: 0,
                        },
                      },
                    }}
                    direction="row"
                    menus={secondaryMenus}
                    sx={{
                      alignItems: { xs: "flex-start", sm: "center" },
                      display: "inline-flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "flex-start",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <StayInTouch
                  {...connect}
                  LinkProps={{
                    component: Link,
                    sx: (theme: Theme) => ({
                      transition: theme.transitions.create(["opacity"]),
                    }),
                  }}
                  TitleProps={{ variant: "footerCap" }}
                  sx={{
                    mt: "0px",
                    py: { xs: 1, sm: 0 },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
});

export type { FooterProps };
export default Footer;
