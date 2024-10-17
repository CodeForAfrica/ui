import { QuickLinks, LogoButton, Copyright } from "@commons-ui/core";
import { Link, StayInTouch } from "@commons-ui/next";
import { RichText } from "@commons-ui/payload";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

import useStyles from "./useStyles";

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

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    !(variant === "explore" && isDesktop) && (
      <div className={classes.root}>
        <Section
          classes={{
            root: classes.section,
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={12} container>
              {logoProps && (
                <LogoButton
                  {...logoProps}
                  component="a"
                  classes={{
                    root: classes.logoButton,
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} lg={6}>
              {description && (
                <RichText
                  variant="body1"
                  className={classes.description}
                  elements={description}
                  typographyProps={{
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
                classes={{
                  root: classes.allLinks,
                }}
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
      </div>
    )
  );
}

export default Footer;
