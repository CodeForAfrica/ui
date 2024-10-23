import { QuickLinks, Copyright } from "@commons-ui/core";
import { Link, StayInTouch } from "@commons-ui/next";
import { RichText } from "@commons-ui/payload";
import { Box, Grid } from "@mui/material";
import React from "react";

import useStyles from "./useStyles";

import NextImageButton from "@/climatemappedafrica/components/NextImageButton";
import Section from "@/climatemappedafrica/components/Section";

function Footer(props) {
  const {
    title,
    connect,
    description,
    logo: logoProps,
    links,
    variant,
  } = props;
  const classes = useStyles(props);

  return (
    <Box
      sx={(theme) => ({
        display: {
          xs: "block",
          lg: variant !== "explore" ? "block" : "none",
        },
        background: theme.palette.grey.dark,
        height: "auto",
        padding: `${theme.typography.pxToRem(80)} 0`,
        [theme.breakpoints.up("md")]: {
          paddingTop: `${theme.typography.pxToRem(58)}`,
          paddingBottom: `${theme.typography.pxToRem(82)}`,
        },
      })}
    >
      <Section>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={12} container>
            {logoProps && (
              <NextImageButton
                {...logoProps}
                width={220}
                height={120}
                priority
                sx={(theme) => ({
                  margin: "0 auto",
                  padding: 0,
                  [theme.breakpoints.up("lg")]: {
                    margin: 0,
                  },
                })}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            {description && (
              <RichText
                variant="body1"
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  padding: `${theme.typography.pxToRem(32)} 0`,
                  fontSize: theme.typography.subtitle1.fontSize,
                  textAlign: "center",
                  [theme.breakpoints.up("lg")]: {
                    textAlign: "left",
                  },
                })}
                elements={description}
                TypographyProps={{
                  LinkProps: {
                    color: "text.secondary",
                    sx: {
                      textDecorationColor: "text.secondary",
                      textDecoration: "underline",
                    },
                  },
                }}
              />
            )}
            <Copyright
              copyright={`© ${new Date().getFullYear()} ${title}`}
              classes={{
                root: classes.copyright,
                text: classes.copyrightText,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid
              container
              sx={(theme) => ({
                margin: "0 auto",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: theme.typography.pxToRem(44.19),
              })}
            >
              <Grid item xs={12} lg={6}>
                {links && (
                  <QuickLinks
                    linkComponent={Link}
                    {...links}
                    classes={{
                      root: classes.quickLinkRoot,
                      list: classes.quickList,
                      link: classes.quickLink,
                      title: classes.quickLinksTitle,
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <StayInTouch
                  {...connect}
                  LinkProps={{
                    component: Link,
                    sx: { color: "text.secondary" },
                  }}
                  TitleProps={{
                    variant: "footerCap",
                    sx: { color: "text.secondary" },
                  }}
                  sx={{ gap: 2 }}
                  direction="column"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}

export default Footer;
