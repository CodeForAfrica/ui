import { Copyright, QuickLinks, StayInTouch, Section } from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import { RichText } from "@commons-ui/payload";
import { Box, Grid } from "@mui/material";
import React from "react";

function Footer(props) {
  const {
    title,
    connect,
    description,
    logo: logoProps,
    links,
    variant,
  } = props;

  return (
    <Box
      sx={({ palette, typography }) => ({
        display: {
          xs: "block",
          lg: variant !== "explore" ? "block" : "none",
        },
        background: palette.grey.dark,
        height: "auto",
        padding: `${typography.pxToRem(80)} 0`,
        paddingTop: {
          md: `${typography.pxToRem(58)}`,
        },
        paddingBottom: {
          md: `${typography.pxToRem(82)}`,
        },
      })}
    >
      <Section>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={12} container>
            {logoProps && (
              <NextImageButton
                {...logoProps}
                style={{
                  height: "auto",
                  width: 220,
                }}
                priority
                sx={{
                  margin: {
                    xs: "0 auto",
                    lg: 0,
                  },
                  padding: 0,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            {description && (
              <RichText
                variant="body1"
                sx={({ palette, typography }) => ({
                  color: palette.text.secondary,
                  padding: `${typography.pxToRem(32)} 0`,
                  fontSize: typography.subtitle1.fontSize,
                  textAlign: {
                    xs: "center",
                    lg: "left",
                  },
                  "& > p": {
                    mt: 2,
                  },
                  "& > p:first-of-type": {
                    mt: 0,
                  },
                })}
                elements={description}
                TypographyProps={{
                  LinkProps: {
                    color: "text.secondary",
                    textDecorationColor: "text.secondary",
                    textDecoration: "underline",
                  },
                }}
              />
            )}
            <Copyright
              copyright={`© ${new Date().getFullYear()} ${title}`}
              TypographyProps={{
                sx: ({ palette, typography }) => ({
                  color: palette.text.secondary,
                  order: 5,
                  padding: {
                    xs: `0 ${typography.pxToRem(5)} 0 0`,
                    lg: `0 ${typography.pxToRem(10)} 0 0`,
                  },
                }),
              }}
              sx={({ typography }) => ({
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: {
                  xs: "center",
                  lg: "flex-start",
                },
                textAlign: {
                  xs: "center",
                  lg: "flex-start",
                },
                "& > a": {
                  marginTop: typography.pxToRem(3),
                },
              })}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid
              container
              sx={({ typography }) => ({
                margin: "0 auto",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: typography.pxToRem(44.19),
              })}
            >
              <Grid item xs={12} lg={6}>
                {links && (
                  <QuickLinks
                    {...links}
                    sx={({ typography }) => ({
                      textAlign: {
                        xs: "center",
                        lg: "inherit",
                      },
                      padding: {
                        xs: `${typography.pxToRem(32)} 0 `,
                        lg: 0,
                      },
                    })}
                    TitleProps={{
                      variant: "subtitle2",
                      sx: ({ palette }) => ({
                        color: palette.text.secondary,
                        fontWeight: "bold",
                      }),
                    }}
                    LinksProps={{
                      linkComponent: Link,
                      sx: ({ palette, typography }) => ({
                        listStyle: "none",
                        color: palette.text.secondary,
                        padding: 0,
                        letterspacing: typography.pxToRem(0.7),
                        "& > li": {
                          marginTop: typography.pxToRem(16),
                        },
                      }),
                    }}
                    LinkProps={{
                      sx: ({ palette }) => ({
                        color: palette.text.secondary,
                        fontWeight: "normal",
                        "&:hover": {
                          color: palette.primary.light,
                        },
                      }),
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <StayInTouch
                  {...connect}
                  LinkProps={{
                    component: Link,
                    sx: {
                      color: "text.secondary",
                      alignItems: { xs: "center", lg: "flex-end" },
                    },
                  }}
                  LinksProps={{
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  alignItems={{ xs: "center", lg: "flex-start" }}
                  TitleProps={{
                    fontWeight: "bold",
                    variant: "subtitle2",
                    sx: { color: "text.secondary", mr: 0 },
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
