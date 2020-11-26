import React from "react";

import clsx from "clsx";

import { useRouter } from "next/router";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import Button from "@/promisetracker/components/Link/Button";
import Logo from "@/promisetracker/components/Navigation/Logo";
import Search from "@/promisetracker/components/Search";

import config from "@/promisetracker/config";
import i18n from "@/promisetracker/lib/i18n";

import MenuButton from "./MenuButton";
import NavigationButton from "./NavigationButton";
import PageNavigation from "./PageNavigation";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: `${typography.pxToRem(54)} 0`,
  },
  section: {},
  button: {
    border: "none",
    height: 48,
    "&:hover": {
      border: "none",
    },
    width: "auto",
  },
  buttonLanguage: {
    color: "#909090",
    fontFamily: typography.fontFamily,
    fontWeight: 400,
    marginLeft: "0.75rem",
    minWidth: 0,
    padding: 0,
    width: "auto",
    "&.active": {
      color: "#EBEBEB",
    },
    "&:hover": {
      background: "inherit",
    },
  },
  buttonLanguageLast: {
    marginRight: "-5.5rem",
  },
  pageNavigation: {
    marginTop: `-${typography.pxToRem(20)}`,
  },
  searchContainer: {
    paddingLeft: "1rem",
  },
}));

function DesktopNavigation(props) {
  const classes = useStyles(props);
  const { analysisMenu } = config;
  const router = useRouter();
  const { asPath, locale: activeLocale } = router;
  const currentPageUrl = asPath.split("/").slice(0, 2).join("/");
  const pageNavigation = analysisMenu.url === currentPageUrl && analysisMenu;
  const _ = i18n();
  const { locales } = _;

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item lg={4}>
              <Logo />
            </Grid>
            <Grid
              item
              lg={4}
              container
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <MenuButton
                  active={currentPageUrl === "/promises"}
                  href="/promises"
                  size="large"
                  title="Promises"
                  variant="outlined"
                  classes={{ root: classes.button }}
                />
              </Grid>

              <Grid item>
                <NavigationButton
                  title={analysisMenu.title}
                  size="large"
                  active={analysisMenu.url === currentPageUrl}
                  classes={{ root: classes.button }}
                >
                  <PageNavigation
                    asPath={analysisMenu.url}
                    navigation={analysisMenu.subnav}
                    classes={{ section: classes.section }}
                  />
                </NavigationButton>
              </Grid>

              <Grid item>
                <MenuButton
                  active={currentPageUrl === "/act-now"}
                  href="/act-now"
                  size="large"
                  title="Act Now"
                  variant="outlined"
                  classes={{ root: classes.button }}
                />
              </Grid>
            </Grid>

            <Grid className={classes.searchContainer} item lg={3}>
              <Search />
            </Grid>

            <Grid item lg={1} direction="column" container justify="flex-start">
              <Grid item container justify="flex-end">
                {locales.slice(0, 2).map((locale) => (
                  <Button
                    key={locale}
                    href={asPath}
                    locale={locale}
                    variant="text"
                    className={clsx(classes.buttonLanguage, {
                      active: locale === activeLocale,
                    })}
                  >
                    {_.language(locale)}
                  </Button>
                ))}
              </Grid>

              <Grid item container justify="flex-end">
                {locales.slice(2, 4).map((locale, i) => (
                  <Button
                    key={locale}
                    href={asPath}
                    locale={locale}
                    variant="text"
                    className={clsx(classes.buttonLanguage, {
                      active: locale === activeLocale,
                      [classes.buttonLanguageLast]: i === 3,
                    })}
                  >
                    {_.language(locale)}
                  </Button>
                ))}
              </Grid>
            </Grid>
            <Grid />
          </Grid>
        </Section>
      </Grid>
      {pageNavigation && pageNavigation.subnav && (
        <Grid item xs={12}>
          <PageNavigation
            asPath={asPath}
            navigation={pageNavigation.subnav}
            classes={{ root: classes.pageNavigation, section: classes.section }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default DesktopNavigation;
